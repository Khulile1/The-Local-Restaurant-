/*

const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;*/
const express = require("express");
const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Auth middleware is working",
    user: req.user,
  });
});

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

module.exports = router;