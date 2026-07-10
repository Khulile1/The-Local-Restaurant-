// Import required libraries and files
// Middleware
// Datbase
// Env file
// App
// Routes

//express
//dotenv
//database
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db.js");

//routes
const authRoutes = require("./src/routes/authRoutes.js")
const menuItemRoutes = require("./src/routes/menuItemRoutes.js")
const restaurantRoute = require("./src/routes/restaurantRoute.js")
const orderRoutes = require("./src/routes/orderRoutes.js")
const paymentRoutes = require("./src/routes/paymentRoutes.js")
const orderItemRoutes = require("./src/routes/orderItemRoutes.js")

//middleware
const rateLimitMiddleware = require("./src/middleware/rateLimitMiddleware");

// Load environment variables from the .env file
// Start with this to use env files
dotenv.config();

// Connect to the database
// Start with this to use your DB
connectDB();

// Create the Express application
// Start with this to start app
const app = express();

// Allow the app to read JSON data from request bodies
// Tell us that it will work with json
app.use(express.json());

// Apply rate limiting before routes to prevent too many requests
app.use(rateLimitMiddleware);

// Test route to check if the backend is running
//http://localhost:5173 Check if Api is runing
app.get("/", (req, res) => {
  res.send("Local Bite Backend API is running");
});

// Connect authentication routes
app.use("/auth", authRoutes);
// Connect menu items routes
app.use("/menuItems", menuItemRoutes);
// Connect restaurant route
app.use("/restaurant", restaurantRoute);
// Connect restaurant route
app.use("/order", orderRoutes);
// Connect restaurant route
app.use("/payment", paymentRoutes);
// Connect restaurant route
app.use("/orderItem", orderItemRoutes);

// Set the port from .env, or use 5324 if no port is provided
const PORT = process.env.PORT  ;

// Start the backend server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});