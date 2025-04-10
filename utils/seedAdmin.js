// seedAdmin.js
const mongoose = require("mongoose");
const Admin = require("../models/Admin");

mongoose.connect("mongodb+srv://ram:t8QK2lZQLs7U9cyT@cluster0.iqiy8bi.mongodb.net/test")
  .then(async () => {
    const existing = await Admin.findOne({ email: "admin@example.com" });
    if (!existing) {
      await Admin.create({ email: "admin@example.com", password: "admin123" });
      console.log("Admin created");
    } else {
      console.log("Admin already exists");
    }
    mongoose.disconnect();
  });
