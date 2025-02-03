const express = require("express");
const router = express.Router();
var ensureLogIn = require("connect-ensure-login").ensureLoggedIn;
const Data = require("../models/data");
const Bookings = require("../models/booking");

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
  res.render("museum");
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
router.get("/payment", (req, res) => {
  res.render("payment", { csrfToken: req.csrfToken() });
});
router.get("/qrpay", (req, res) => {
  res.render("qr_payment", { csrfToken: req.csrfToken() });
});
router.get("/bookings", (req, res) => {
  res.render("bookings", { csrfToken: req.csrfToken() });
});

router.post("/bookings", ensureLoggedIn, async (req, res) => {
  try {
    const data = req.body;
    const booking = new Bookings(data);
    await booking.save();
    console.log("Booking saved successfully", booking);
    res.redirect("/payment");
    // res.status(201).json({ message: 'Ticket booked successfully' });
  } catch (error) {
    console.error("Error saving ticket", error);
    // res.status(500).json({ message: 'Error saving ticket', error: error.message });
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
module.exports = router;
