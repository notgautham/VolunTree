import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const router = express.Router();

// User Signup
router.post("/signup", async (req, res) => {
  const { fullName, email, password, contactNumber, address, age, gender, userType, contactPerson, websiteUrl, description } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    if (userType === "volunteer") {
      // Insert into volunteers table
      await pool.query(
        "INSERT INTO volunteers (full_name, email, password, contact_number, address, age, gender) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [fullName, email, hashedPassword, contactNumber, address, age, gender]
      );
    } else if (userType === "host") {
      // Insert into hosts table
      await pool.query(
        "INSERT INTO hosts (organization_name, contact_person, email, password, contact_number, address, website_url, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [fullName, contactPerson, email, hashedPassword, contactNumber, address, websiteUrl, description]
      );
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userResult = await pool.query(
      `SELECT id, email, password, 'volunteer' as userType 
       FROM volunteers WHERE email = $1
       UNION
       SELECT id, email, password, 'host' as userType 
       FROM hosts WHERE email = $1`,
      [email]
    );
    if (userResult.rows.length === 0)
      return res.status(401).json({ message: "User not found" });
    const user = userResult.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user.id, userType: user.usertype }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, userType: user.usertype });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;
