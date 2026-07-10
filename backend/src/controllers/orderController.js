const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const orderCreate = await Order.create(req.body);
    res.status(201).json(orderCreate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findOrder = async (req, res) => {
  try {
    const orderFind = await Order.find();
    res.status(200).json(orderFind);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findsOrder = async (req, res) => {
  try {
    const orderFinds = await Order.findById(req.params.id);

    if (!orderFinds) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(orderFinds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderUpdate = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!orderUpdate) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(orderUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderDelete = await Order.findByIdAndDelete(req.params.id);

    if (!orderDelete) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  findOrder,
  findsOrder,
  updateOrder,
  deleteOrder,
};