const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid"); // Import UUID

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true, default: uuidv4 }, // Generate unique userId
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "employee"], required: true },
  phone: { type: String },
  userImage: { type: String },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
