const { Pool } = require("pg");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.query("SELECT NOW()", (err) => {
  if (err) {
    console.error(" Database Connection Failed:", err.message);
  } else {
    console.log(" Connected to PostgreSQL successfully!");
  }
});

module.exports = pool;
