const express = require("express");
const router = express.Router();

const {
  createMenuItem,
  getMenuItems,
  getMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuItemController");



router.get("/test", (req, res) => {
  res.json({ message: "Menu item routes working" });
});

router.post("/", createMenuItem);
router.get("/", getMenuItems);
router.get("/:id", getMenuItem);
router.put("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);

module.exports = router;