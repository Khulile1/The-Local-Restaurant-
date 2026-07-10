const express = require("express");
const router = express.Router();

const {restaurantCreate, restaurantFind, restaurantFinds, restaurantUpdate, restaurantDelete} = require("../controllers/restaurantController");

router.get("/test", (req, res) => {
  res.json({ message: "restaurant working working" });
});

// Create restaurant
router.post("/", restaurantCreate);

// Get all restaurants
router.get("/", restaurantFind);

// Get one restaurant by ID
router.get("/:id", restaurantFinds);

// Update restaurant by ID
router.put("/:id", restaurantUpdate);

// Delete restaurant by ID
router.delete("/:id", restaurantDelete);

module.exports = router;