const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const adminController = require("../controllers/adminController");
const csurf = require("csurf");

// Show login page
router.get("/admin/login", (req, res) => {
  res.render("adminlogin", { error: null });
});

// Handle login
router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin || admin.password !== password) {
    return res.render("adminlogin", { error: "Invalid email or password" });
  }

  req.session.isAdmin = true;
  res.redirect("/admin");
});

// Middleware to protect admin routes
function requireAdmin(req, res, next) {
  if (req.session.isAdmin) return next();
  res.redirect("/admin/login");
}

router.get("/admin", requireAdmin, adminController.getAdminDashboard);

// Logout
router.get("/admin/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/admin/login"));
});

module.exports = router;