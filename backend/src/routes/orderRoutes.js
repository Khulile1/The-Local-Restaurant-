const express = require("express");
const router = express.Router();

const {
  createOrder,
  findOrder,
  findsOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.get("/test", (req, res) => {
  res.json({ message: "order routes working" });
});

router.post("/", createOrder);
router.get("/", findOrder);
router.get("/:id", findsOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;