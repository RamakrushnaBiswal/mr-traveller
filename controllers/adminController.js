const {User} = require("../models/googleuser");
const {Bookings} = require("../models/booking");
const RegisteredUser = require("../models/data");

exports.getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBookings = await Bookings.countDocuments();
    const totalTours = await RegisteredUser.countDocuments();

    // Get all bookings and populate user name
    const bookings = await Bookings.find().populate("name", "name");

    const users = await User.find(); // Fetch all users
    const tours = await RegisteredUser.find(); // Fetch all tours
    res.render("admin", {
      totalUsers,
      totalBookings,
      totalTours,
      bookings,
      users,
      tours,
      userCount: users.length,
      bookingCount: bookings.length,
      tourCount: tours.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading admin dashboard");
  }
};
