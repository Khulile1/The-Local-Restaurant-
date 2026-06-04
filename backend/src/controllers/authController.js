const express = require("express");

const router = express.Router();

router.post("/register", (req, res) => {
  res.json({
    message: "Register endpoint ready",
  });
});

router.post("/login", (req, res) => {
  res.json({
    message: "Login endpoint ready",
  });
});

module.exports = router;