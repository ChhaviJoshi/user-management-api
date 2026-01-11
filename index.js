const express = require("express");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes"); // <--- 1. Import User Routes
const pool = require("./src/config/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // <--- 2. Mount User Routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
