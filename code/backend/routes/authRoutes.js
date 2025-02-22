import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const router = express.Router();

// -----------------------
// Authentication Endpoints
// -----------------------

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

// User Login – Updated to use userType from request
router.post("/login", async (req, res) => {
  const { email, password, userType } = req.body;
  
  if (!userType) {
    return res.status(400).json({ message: "User type not provided" });
  }
  
  // Determine which table to query based on userType
  const table = userType === "volunteer" ? "volunteers" : "hosts";

  try {
    const userResult = await pool.query(
      `SELECT id, email, password FROM ${table} WHERE email = $1`,
      [email]
    );
    
    if (userResult.rows.length === 0)
      return res.status(401).json({ message: "User not found" });
      
    const user = userResult.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword)
      return res.status(401).json({ message: "Invalid credentials" });
      
    const token = jwt.sign({ id: user.id, userType }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, userType });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check Email Endpoint
router.post("/check-email", async (req, res) => {
  const { email } = req.body;

  try {
    const volunteerResult = await pool.query("SELECT email FROM volunteers WHERE email = $1", [email]);
    const hostResult = await pool.query("SELECT email FROM hosts WHERE email = $1", [email]);

    const volunteerExists = volunteerResult.rows.length > 0;
    const hostExists = hostResult.rows.length > 0;

    if (volunteerExists && hostExists) {
      return res.json({ exists: true, roles: ["volunteer", "host"] });
    } else if (volunteerExists) {
      return res.json({ exists: true, roles: ["volunteer"] });
    } else if (hostExists) {
      return res.json({ exists: true, roles: ["host"] });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking email existence:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// -----------------------
// Volunteer Profile Endpoints
// -----------------------

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Expecting { id, userType }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Get volunteer profile
router.get("/volunteer/profile", verifyToken, async (req, res) => {
  // Ensure only volunteers access this endpoint
  if (req.user.userType !== "volunteer") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const result = await pool.query(
      "SELECT id, full_name, email, contact_number, address, age, gender FROM volunteers WHERE id = $1",
      [req.user.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Profile not found" });
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update volunteer profile
router.put("/volunteer/profile/update", verifyToken, async (req, res) => {
  if (req.user.userType !== "volunteer") {
    return res.status(403).json({ message: "Access denied" });
  }

  const { fullName, contactNumber, address, age, gender } = req.body;
  try {
    await pool.query(
      `UPDATE volunteers
       SET full_name = $1,
           contact_number = $2,
           address = $3,
           age = $4,
           gender = $5
       WHERE id = $6`,
      [fullName, contactNumber, address, age, gender, req.user.id]
    );
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
