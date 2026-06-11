<<<<<<< HEAD
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

// Load environment variables
dotenv.config();

// Connect to MongoDB Database
=======
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db.js");
const authRoutes = require("./src/routes/authRoutes.js");
const rateLimitMiddleware = require("./src/middleware/rateLimitMiddleware");

dotenv.config();

>>>>>>> auth-backend
connectDB();

const app = express();

<<<<<<< HEAD
// Middleware
app.use(express.json());

// API Routes (Mapped exactly to your routes folder file names)
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/restaurants', require('./routes/restaurantRoute'));
app.use('/api/menuitems', require('./routes/menuitemRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/orderitems', require('./routes/orderitemRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));

// Port Setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
=======
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
>>>>>>> auth-backend
