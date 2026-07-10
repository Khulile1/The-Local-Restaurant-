const OrderItem = require("../models/OrderItem");

const createOrderItem = async (req, res) => {
  try {
    const doc = await OrderItem.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrderItems = async (req, res) => {
  try {
    const docs = await OrderItem.find().populate("order_id menu_item_id");
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrderItem = async (req, res) => {
  try {
    const doc = await OrderItem.findById(req.params.id).populate(
      "order_id menu_item_id"
    );

    if (!doc) {
      return res.status(404).json({ message: "Order item not found" });
    }

    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateOrderItem = async (req, res) => {
  try {
    const doc = await OrderItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!doc) {
      return res.status(404).json({ message: "Order item not found" });
    }

    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteOrderItem = async (req, res) => {
  try {
    const doc = await OrderItem.findByIdAndDelete(req.params.id);

    if (!doc) {
      return res.status(404).json({ message: "Order item not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createOrderItem,
  getOrderItems,
  getOrderItem,
  updateOrderItem,
  deleteOrderItem,
};