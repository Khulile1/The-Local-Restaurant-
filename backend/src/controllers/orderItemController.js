const OrderItem = require('../models/OrderItem');

exports.createOrderItem = async (req, res) => {
    try { const doc = await OrderItem.create(req.body); res.status(201).json(doc); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
exports.getOrderItems = async (req, res) => {
    try { const docs = await OrderItem.find().populate('order_id menu_item_id'); res.json(docs); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
exports.getOrderItem = async (req, res) => {
    try { const doc = await OrderItem.findById(req.params.id).populate('order_id menu_item_id'); if (!doc) return res.status(404).json({ message: 'Not found' }); res.json(doc); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
exports.updateOrderItem = async (req, res) => {
    try { const doc = await OrderItem.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(doc); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
exports.deleteOrderItem = async (req, res) => {
    try { await OrderItem.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted successfully' }); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
