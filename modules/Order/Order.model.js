const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        shoppingInfo: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Shopping',
                required: true
            }
        ],
        customerInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true
        },
        areaStatus: {
            type: String,
            required: true
        },

        paymentStatus: {
            type: String,

            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        orderStatus: {
            type: String,
            enum: ['arrived', 'approved', 'done'], // enum to restrict values
            default: 'arrived' // default value
        }
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = { Order };
