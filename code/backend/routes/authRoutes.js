import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const router = express.Router();

// User Signup
router.post("/signup", async (req, res) => {
  const { fullName, email, password, contactNumber, address, age, gender, userType } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    if (userType === "volunteer") {
      await pool.query(
        "INSERT INTO volunteers (full_name, email, password, contact_number, address, age, gender) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [fullName, email, hashedPassword, contactNumber, address, age, gender]
      );
    } else {
      await pool.query(
        "INSERT INTO hosts (organization_name, contact_person, email, password, contact_number, address) VALUES ($1, $2, $3, $4, $5, $6)",
        [fullName, email, hashedPassword, contactNumber, address]
      );
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query(
      "SELECT * FROM volunteers WHERE email = $1 UNION SELECT * FROM hosts WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) return res.status(401).json({ message: "User not found" });

    const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!isValidPassword) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.rows[0].id, userType: user.rows[0].userType }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, userType: user.rows[0].userType });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
