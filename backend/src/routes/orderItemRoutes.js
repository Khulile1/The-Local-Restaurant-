const express = require("express");
const router = express.Router();

const {
  createOrderItem,
  getOrderItems,
  getOrderItem,
  updateOrderItem,
  deleteOrderItem,
} = require("../controllers/orderItemController");

router.get("/test", (req, res) => {
  res.json({ message: "Order item routes working" });
});

router.post("/", createOrderItem);
router.get("/", getOrderItems);
router.get("/:id", getOrderItem);
router.put("/:id", updateOrderItem);
router.delete("/:id", deleteOrderItem);

module.exports = router;