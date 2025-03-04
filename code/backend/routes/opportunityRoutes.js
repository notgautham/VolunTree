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
      [
        req.user.id,
        title,
        description,
        location,
        date,
        JSON.stringify(requirements),
      ]
    );

    res
      .status(201)
      .json({ message: "Opportunity created!", opportunity: result.rows[0] });
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
    const opportunityCheck = await pool.query(
      "SELECT * FROM opportunities WHERE id = $1",
      [opportunityId]
    );
    if (opportunityCheck.rows.length === 0) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    // Check if volunteer is already signed up
    const existingSignup = await pool.query(
      "SELECT * FROM volunteer_signups WHERE volunteer_id = $1 AND opportunity_id = $2",
      [req.user.id, opportunityId]
    );

    if (existingSignup.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "You have already signed up for this opportunity" });
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

router.get("/host/registrations", verifyToken, async (req, res) => {
  if (req.user.userType !== "host") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const result = await pool.query(
      `SELECT 
          o.id AS opportunity_id,
          o.title,
          v.id AS volunteer_id,
          v.full_name,
          v.email,
          v.contact_number,
          v.age,
          v.gender,
          v.address
       FROM opportunities o
       LEFT JOIN volunteer_signups vs ON o.id = vs.opportunity_id
       LEFT JOIN volunteers v ON vs.volunteer_id = v.id
       WHERE o.host_id = $1
       ORDER BY o.date DESC`,
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

// 🔹 GET host opportunities (updated with volunteer_count)
router.get("/host-opportunities", verifyToken, async (req, res) => {
  if (req.user.userType !== "host") {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const query = `
      SELECT o.*, COALESCE(COUNT(vs.volunteer_id), 0) AS volunteer_count
      FROM opportunities o
      LEFT JOIN volunteer_signups vs ON o.id = vs.opportunity_id
      WHERE o.host_id = $1
      GROUP BY o.id
      ORDER BY o.date DESC
    `;
    const result = await pool.query(query, [req.user.id]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching host opportunities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 GET endpoint for volunteer opportunities (updated to include is_signed_up)
router.get("/volunteer", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const query = `
      SELECT
        o.*,
        COALESCE(COUNT(vs.volunteer_id), 0) AS volunteer_count,
        CASE WHEN MAX(CASE WHEN vs.volunteer_id = $1 THEN 1 ELSE 0 END) = 1
             THEN true
             ELSE false
        END AS is_signed_up
      FROM opportunities o 
      LEFT JOIN volunteer_signups vs ON o.id = vs.opportunity_id 
      WHERE o.date >= CURRENT_TIMESTAMP 
      GROUP BY o.id 
      ORDER BY o.date DESC
    `;
    const result = await pool.query(query, [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching volunteer opportunities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// 🔹 DELETE endpoint to remove a volunteer from an opportunity (host only)
router.delete(
  "/volunteer/:opportunityId/:volunteerId",
  verifyToken,
  async (req, res) => {
    if (req.user.userType !== "host") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { opportunityId, volunteerId } = req.params;

    try {
      // Verify that the opportunity belongs to the host
      const oppCheck = await pool.query(
        "SELECT * FROM opportunities WHERE id = $1 AND host_id = $2",
        [opportunityId, req.user.id]
      );
      if (oppCheck.rows.length === 0) {
        return res
          .status(404)
          .json({
            message: "Opportunity not found or does not belong to you.",
          });
      }

      // Delete the volunteer signup record
      await pool.query(
        "DELETE FROM volunteer_signups WHERE opportunity_id = $1 AND volunteer_id = $2",
        [opportunityId, volunteerId]
      );

      res.json({ message: "Volunteer removed successfully." });
    } catch (error) {
      console.error("Error removing volunteer:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);


router.delete("/volunteer/my-opportunities/:opportunityId", verifyToken, async (req, res) => {
  console.log("DELETE /volunteer/my-opportunities route called");
  console.log("User type is:", req.user.userType);
  if (req.user.userType !== "volunteer") {
    return res.status(403).json({ message: "Access denied" });
  }

  const { opportunityId } = req.params;
  try {
    // Check if the volunteer is signed up for this opportunity
    const checkSignup = await pool.query(
      "SELECT * FROM volunteer_signups WHERE volunteer_id = $1 AND opportunity_id = $2",
      [req.user.id, opportunityId]
    );

    if (checkSignup.rows.length === 0) {
      return res.status(404).json({ message: "You are not registered for this opportunity" });
    }

    // Delete the signup
    await pool.query(
      "DELETE FROM volunteer_signups WHERE volunteer_id = $1 AND opportunity_id = $2",
      [req.user.id, opportunityId]
    );

    return res.json({ message: "Successfully unregistered from the event" });
  } catch (error) {
    console.error("Error removing volunteer signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



export default router;
