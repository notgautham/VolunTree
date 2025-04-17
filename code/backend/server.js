// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import opportunityRoutes from "./routes/opportunityRoutes.js"; // 🔹 Import new opportunity routes
import { connectDB } from "./config/db.js"; // Database connection

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/opportunities", opportunityRoutes); // 🔹 Register new routes

// Start Server
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("VolunTree backend is live!");
  });
  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
