// Declaration: import Express and required files
const express = require("express");

// Import controller functions
const { register, login } = require("../controllers/authController");

// Import middleware
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const loginRateLimitMiddleware = require("../middleware/loginRateLimitMiddleware");

// Create an Express router for authentication routes
const router = express.Router();

// Public route: register a new user
router.post("/register", register);

// Public route: log in an existing user
// Login route protected by 3-attempt limiter
router.post("/login", loginRateLimitMiddleware, login);

// Protected route: test auth middleware and return the logged-in user
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Auth middleware is working",
    user: req.user,
  });
});

// Protected route: only admin users can access this route
router.get(
  "/admin-only",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({
      message: "Admin access granted",
      user: req.user,
    });
  }
);

// Protected route: only customer users can access this route
router.get(
  "/customer-only",
  authMiddleware,
  roleMiddleware("customer"),
  (req, res) => {
    res.json({
      message: "Customer access granted",
      user: req.user,
    });
  }
);

router.get("/driver-only", authMiddleware, roleMiddleware("driver"), (req, res) => {
  res.json({
    message: "Driver access granted",
    user: req.user,
  });
});

router.get("/restaurant-only", authMiddleware, roleMiddleware("restaurant"), (req, res) => {
  res.json({
    message: "Restaurant access granted",
    user: req.user,
  });
});

// Export router so app.js can use these routes
module.exports = router;