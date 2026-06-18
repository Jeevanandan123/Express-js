import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// POST /api/auth/register
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // Check if email already exists
    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email = ?", [email]
    );
    if (existing.length > 0) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    // Hash the password
    const hashed = await bcrypt.hash(password, 10);

    // Save user to DB
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashed]
    );

    res.status(201).json({ msg: "User registered", id: result.insertId });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  try {
    // Find user by email
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ?", [email]
    );
    if (rows.length === 0) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const user = rows[0];

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};