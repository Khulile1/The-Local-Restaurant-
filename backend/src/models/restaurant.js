const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    image_url: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', RestaurantSchema);
