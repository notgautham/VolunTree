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
  // ...
});

export default router;
