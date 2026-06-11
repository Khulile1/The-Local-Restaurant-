const User = require('../models/User');

exports.createUser = async (req, res) => {
    try { const doc = await User.create(req.body); res.status(201).json(doc); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
exports.getUsers = async (req, res) => {
    try { const docs = await User.find(); res.json(docs); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
exports.getUser = async (req, res) => {
    try { const doc = await User.findById(req.params.id); if (!doc) return res.status(404).json({ message: 'Not found' }); res.json(doc); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
exports.updateUser = async (req, res) => {
    try { const doc = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(doc); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
exports.deleteUser = async (req, res) => {
    try { await User.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted successfully' }); } 
    catch (err) { res.status(500).json({ message: err.message }); }
};
