const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,

            required: true,
            index: true
        },
        productPrice: {
            type: Number,

            required: true
        },
        productImgList: {
            type: [String], // Array of strings
            validate: {
                validator: function (v) {
                    return v.length < 5; // Ensures array length is less than 5
                },
                message: (props) =>
                    `Array length should be less than 5, but got ${props.value.length}`
            },
            required: true
        },
        productStatus: {
            type: String,
            required: true
        },

        productBrand: {
            type: String
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,

            ref: 'Category',
            required: true
        },
        amountOfSell: {
            type: Number,
            required: true
        },
        star: {
            type: Number,
            max: 6,
            required: true
        },
        size: {
            type: [String],
            required: true
        },
        reviews: {
            type: Number,
            required: true
        },
        features: {
            type: [String],
            required: true
        }
    },
    { timestamps: true }
);

productSchema.index({ productName: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
