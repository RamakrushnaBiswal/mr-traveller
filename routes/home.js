const express = require("express");
const mongoose =require("mongoose")
const router = express.Router();
var ensureLogIn = require("connect-ensure-login").ensureLoggedIn;
const Data = require("../models/data");
const {Bookings} = require("../models/booking");

var ensureLoggedIn = ensureLogIn();

router.get(
  "/",
  function (req, res, next) {
    if (!req.user) {
      return res.render("index");
    }
    next();
  },
  function (req, res, next) {
    res.locals.filter = null;
    res.render("home", { user: req.user });
  }
);

router.get("/about", (req, res) => {
  res.render("about");
});
router.get("/museum", (req, res) => {
  if (!req.user) {
    return res.redirect("/login"); // or show a guest view
  }
  res.render("museum", { user: req.user });
});

router.get("/abtmuseum", (req, res) => {
  res.render("aboutmuseum");
});
router.get("/points", (req, res) => {
  res.render("Points");
});
router.get("/mlocation", (req, res) => {
  res.render("mlocation");
});
router.get("/contact", (req, res) => {
  res.render("contact");
});
router.get("/payment", (req, res) => {
  res.render("payment");
});

router.get('/payment-success', (req, res) => {
  res.render('payment-success'); // Or show confirmation page
});


router.get("/bookings/:id", ensureLoggedIn, async (req, res) => {
  try {
    const userId = req.params.id;  // Correctly access `id`
    console.log("Fetching bookings for user:", userId);
    res.render("bookings", { csrfToken: req.csrfToken(), user: userId });

  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).send("Internal Server Error");
  }
});


router.post("/bookings", ensureLoggedIn, async (req, res) => {
  try {
    const { name, date, phone, slot } = req.body;
    const userId = req.user._id; // Get logged-in user ID

    const booking = new Bookings({ userId, name, date, phone, slot });
    await booking.save();

    console.log("Booking saved successfully:", booking);
    res.redirect("/payment");

  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).send("Error saving booking");
  }
});


router.get("/locations", ensureLoggedIn, (req, res) => {
  res.render("location");
});
router.get("/policy", (req, res) => {
  res.render("policy");
});
router.get("/review", ensureLoggedIn, (req, res) => {
  res.render("review");
});
router.get("/thankyou", ensureLoggedIn, (req, res) => {
  res.render("thankyou");
});
router.get("/travel", ensureLoggedIn, (req, res) => {
  res.render("travel");
});
router.get("/total", ensureLoggedIn, (req, res) => {
  res.render("total");
});
router.get("/health", ensureLoggedIn, (req, res) => {
  res.render("health");
});
router.get("/food", ensureLoggedIn, (req, res) => {
  res.render("food");
});
router.get("/hotel", ensureLoggedIn, (req, res) => {
  res.render("hotel");
});
router.get("/offlinemap", ensureLoggedIn, (req, res) => {
  res.render("offlinemap");
});
router.get("/tour", ensureLoggedIn, (req, res) => {
  res.render("tour");
});
router.get("/viewbookings/:id", ensureLoggedIn, async (req, res) => {
  const userId = req.params.id;
  try {
    const bookings = await Data.find({ resid: userId })
      .populate("resid")
      .exec();
    res.render("viewbookings", { bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ Fetch bookings based on user ID
router.get("/museumbookings/:id", ensureLoggedIn, async (req, res) => {
  try {
    const userId = req.params.id;

    // Ensure userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send("Invalid user ID");
    }

    // Query bookings where 'name' matches the user's ObjectId
    const bookings = await Bookings.find({ name: userId }).populate("name", "name").exec();
    
    console.log(bookings); // Debugging

    res.render("museumbookings", { bookings });
  } catch (error) {
    console.error("Error fetching museum bookings:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ Delete a booking
router.post("/deletebooking/:id", ensureLoggedIn, async (req, res) => {
  try {
    const bookingId = req.params.id;

    // Validate bookingId as a proper ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ error: "Invalid booking ID" });
    }

    // Find and delete the booking
    const deletedBooking = await Bookings.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.redirect("/museumbookings/" + req.user.id);
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).send("Internal Server Error");
  }
});




module.exports = router;
