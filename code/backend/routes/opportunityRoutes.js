import express from "express";
import pool from "../config/db.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Host creates an opportunity
router.post("/create", verifyToken, async (req, res) => {
    if (req.user.userType !== "host") {
        return res.status(403).json({ message: "Access denied" });
    }

    const { title, description, location, date, requirements } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO opportunities (host_id, title, description, location, date, requirements)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [req.user.id, title, description, location, date, JSON.stringify(requirements)]
        );

        res.status(201).json({ message: "Opportunity created!", opportunity: result.rows[0] });
    } catch (error) {
        console.error("Error creating opportunity:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 🔹 Volunteer signs up for an opportunity
router.post("/signup/:opportunityId", verifyToken, async (req, res) => {
    if (req.user.userType !== "volunteer") {
        return res.status(403).json({ message: "Access denied" });
    }

    const { opportunityId } = req.params;

    try {
        // Check if opportunity exists
        const opportunityCheck = await pool.query("SELECT * FROM opportunities WHERE id = $1", [opportunityId]);
        if (opportunityCheck.rows.length === 0) {
            return res.status(404).json({ message: "Opportunity not found" });
        }

        // Check if volunteer is already signed up
        const existingSignup = await pool.query(
            "SELECT * FROM volunteer_signups WHERE volunteer_id = $1 AND opportunity_id = $2",
            [req.user.id, opportunityId]
        );

        if (existingSignup.rows.length > 0) {
            return res.status(400).json({ message: "You have already signed up for this opportunity" });
        }

        // Insert into signups table
        await pool.query(
            "INSERT INTO volunteer_signups (volunteer_id, opportunity_id) VALUES ($1, $2)",
            [req.user.id, opportunityId]
        );

        res.json({ message: "Successfully signed up!" });
    } catch (error) {
        console.error("Error signing up:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 🔹 Host views all registered volunteers
router.get("/host/registrations", verifyToken, async (req, res) => {
    if (req.user.userType !== "host") {
        return res.status(403).json({ message: "Access denied" });
    }

    try {
        const result = await pool.query(
            `SELECT v.id, v.full_name, v.email, o.title 
             FROM volunteer_signups vs
             JOIN volunteers v ON vs.volunteer_id = v.id
             JOIN opportunities o ON vs.opportunity_id = o.id
             WHERE o.host_id = $1`,
            [req.user.id]
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching registrations:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 🔹 Volunteer views their signed-up opportunities
router.get("/volunteer/my-opportunities", verifyToken, async (req, res) => {
    if (req.user.userType !== "volunteer") {
        return res.status(403).json({ message: "Access denied" });
    }

    try {
        const result = await pool.query(
            `SELECT o.id, o.title, o.location, o.date 
             FROM volunteer_signups vs
             JOIN opportunities o ON vs.opportunity_id = o.id
             WHERE vs.volunteer_id = $1`,
            [req.user.id]
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching signed-up opportunities:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 🔹 GET host opportunities
router.get("/host-opportunities", verifyToken, async (req, res) => {
    if (req.user.userType !== "host") {
        return res.status(403).json({ message: "Access denied" });
    }
    try {
        const result = await pool.query(
            "SELECT * FROM opportunities WHERE host_id = $1 ORDER BY date DESC",
            [req.user.id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching host opportunities:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


export default router;