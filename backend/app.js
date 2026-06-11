const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/authRoutes");
const rateLimitMiddleware = require("./src/middleware/rateLimitMiddleware");

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.use(rateLimitMiddleware);

app.get("/", (req, res) => {
  res.json({
    message: "Local Bite Platform API is running",
  });
});

app.use("/api/auth", authRoutes);

module.exports = app;