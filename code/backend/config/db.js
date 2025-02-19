// db.js
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export async function connectDB() {
  try {
    // Run a simple query to test the connection
    await pool.query("SELECT NOW()");
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

export default pool;
