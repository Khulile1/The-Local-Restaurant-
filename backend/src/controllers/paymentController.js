const Payment = require("../models/Payment");

const createPayment = async (req, res) => {
  try {
    const doc = await Payment.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPayments = async (req, res) => {
  try {
    const docs = await Payment.find().populate("order_id");
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPayment = async (req, res) => {
  try {
    const doc = await Payment.findById(req.params.id).populate("order_id");

    if (!doc) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePayment = async (req, res) => {
  try {
    const doc = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!doc) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletePayment = async (req, res) => {
  try {
    const doc = await Payment.findByIdAndDelete(req.params.id);

    if (!doc) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPayment,
  getPayments,
  getPayment,
  updatePayment,
  deletePayment,
};