const MenuItem = require('../models/MenuItem');

exports.createMenuItem = async (req, res) => {
    try { const doc = await MenuItem.create(req.body); res.status(201).json(doc); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
exports.getMenuItems = async (req, res) => {
    try { const docs = await MenuItem.find().populate('restaurant_id'); res.json(docs); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
exports.getMenuItem = async (req, res) => {
    try { const doc = await MenuItem.findById(req.params.id).populate('restaurant_id'); if (!doc) return res.status(404).json({ message: 'Not found' }); res.json(doc); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
exports.updateMenuItem = async (req, res) => {
    try { const doc = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(doc); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
exports.deleteMenuItem = async (req, res) => {
    try { await MenuItem.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted successfully' }); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
