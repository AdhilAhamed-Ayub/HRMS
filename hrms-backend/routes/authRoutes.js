const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

// User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// verify token
router.get("/verify", auth, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// add user
router.post("/users", auth, async (req, res) => {
  try {
    const { name, email, password, role, phone, userImage, address, status } =
      req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role,
      phone,
      userImage,
      address,
      status,
    });

    await user.save();

    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Get profile details
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get total number of employees
router.get("/employees/count", auth, async (req, res) => {
  try {
    const count = await User.countDocuments({ role: "employee" });
    res.json({ count });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get total number of admins
router.get("/admins/count", auth, async (req, res) => {
  try {
    const count = await User.countDocuments({ role: "admin" });
    res.json({ count });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

//
