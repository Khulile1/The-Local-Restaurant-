const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    total_amount: { type: Number, required: true },
    status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
