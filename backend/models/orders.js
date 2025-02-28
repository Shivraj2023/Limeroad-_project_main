
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            title: String,
            quantity: Number,
        }
    ],
    total: Number,
    status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
