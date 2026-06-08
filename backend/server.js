const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db.js");
const authRoutes = require("./src/routes/authRoutes.js");
const rateLimitMiddleware = require("./src/middleware/rateLimitMiddleware");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// Apply rate limiting before routes
app.use(rateLimitMiddleware);

app.get("/", (req, res) => {
  res.send("Local Bite Backend API is running");
});

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});