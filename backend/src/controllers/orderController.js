const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    try { const doc = await Order.create(req.body); res.status(201).json(doc); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
exports.getOrders = async (req, res) => {
    try { const docs = await Order.find().populate('user_id restaurant_id'); res.json(docs); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
exports.getOrder = async (req, res) => {
    try { const doc = await Order.findById(req.params.id).populate('user_id restaurant_id'); if (!doc) return res.status(404).json({ message: 'Not found' }); res.json(doc); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
exports.updateOrder = async (req, res) => {
    try { const doc = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(doc); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
exports.deleteOrder = async (req, res) => {
    try { await Order.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted successfully' }); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
