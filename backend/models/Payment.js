const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },

    payment_method: String,

    status:{
        type: String,
        default: 'Paid'
    },

    paid_on: Date
});

module.exports = mongoose.model('Payment', PaymentSchema);