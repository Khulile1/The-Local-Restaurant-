//Declarations
// Importing your app
// Cors = sharing of resources from frontend to backend
// Middleware
// Routes

// Import required libraries and route/middleware files
const express = require("express");
const cors = require("cors");

//routes
const authRoutes = require("./src/routes/authRoutes");
const menuItemRoutes = require("./src/routes/menuItemRoutes.js");
const restaurantRoute = require("./src/routes/restaurantRoutes.js");
const orderRoutes = require("./src/routes/orderRoutes.js")
const paymentRoutes = require("./src/routes/paymentRoutes.js")
const orderitemRoutes = require("./src/routes/orderitemRoutes.js")

const rateLimitMiddleware = require("./src/middleware/rateLimitMiddleware");

// Create the Express application
const app = express();

// Allow the frontend to connect to the backend
app.use(cors({
 origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

// Allow the app to read JSON request bodies
app.use(express.json());

// Apply rate limiting before routes
app.use(rateLimitMiddleware);

// Test route to check if the API is running
app.get("/", (req, res) => {
  res.json({
    message: "Local Bite Platform API is running",
  });
});

// Connect authentication API routes
app.use("/api/auth", authRoutes);
app.use("/api/menuItems", menuItemRoutes);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orderitem", orderitemRoutes);

// Export the configured app so server.js can start it
module.exports = app;