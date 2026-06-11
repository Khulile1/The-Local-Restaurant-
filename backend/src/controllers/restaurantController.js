const Restaurant = require('../models/restaurant');

exports.createRestaurant = async (req, res) => {
    try { const doc = await Restaurant.create(req.body); res.status(201).json(doc); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
exports.getRestaurants = async (req, res) => {
    try { const docs = await Restaurant.find(); res.json(docs); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
exports.getRestaurant = async (req, res) => {
    try { const doc = await Restaurant.findById(req.params.id); if (!doc) return res.status(404).json({ message: 'Not found' }); res.json(doc); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
exports.updateRestaurant = async (req, res) => {
    try { const doc = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(doc); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
exports.deleteRestaurant = async (req, res) => {
    try { await Restaurant.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted successfully' }); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
