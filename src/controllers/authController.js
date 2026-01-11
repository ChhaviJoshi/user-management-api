const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Import JWT library
const userModel = require("../models/userModel");

//REGISTER
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields required" });

  try {
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ error: "Email already in use" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await userModel.createUser(name, email, hashedPassword);

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser.id, email: newUser.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// --- LOGIN  ---
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" }); // Security tip: Don't say "User not found"
    }

    // Verify password (assuming you use bcrypt or similar)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Sign token with 1-hour expiration
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token: token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { register, login };
