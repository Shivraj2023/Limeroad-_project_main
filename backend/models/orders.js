
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
        {
            productId: { type:String, ref: 'Product' },
            title: String,
            quantity: Number,
        }
    ],
    total: Number,
    status: { type: String, default: 'Pending' }
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

module.exports=Order;