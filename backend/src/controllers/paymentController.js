const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
    try { const doc = await Payment.create(req.body); res.status(201).json(doc); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
exports.getPayments = async (req, res) => {
    try { const docs = await Payment.find().populate('order_id'); res.json(docs); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
exports.getPayment = async (req, res) => {
    try { const doc = await Payment.findById(req.params.id).populate('order_id'); if (!doc) return res.status(404).json({ message: 'Not found' }); res.json(doc); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
exports.updatePayment = async (req, res) => {
    try { const doc = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(doc); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
exports.deletePayment = async (req, res) => {
    try { await Payment.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted successfully' }); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
