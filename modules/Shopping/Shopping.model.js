const mongoose = require('mongoose');

const shoppingSchema = new mongoose.Schema(
    {
        productImg: {
            type: String,

            required: true
        },
        productQty: {
            type: Number,

            required: true
        },
        productName: {
            type: String,
            required: true
        },

        productId: {
            type: mongoose.Schema.Types.ObjectId,

            required: true
        },
        productSize: {
            type: String,
            required: true
        },
        productPrice: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

const Shopping = mongoose.model('Shopping', shoppingSchema);

module.exports = { Shopping };
