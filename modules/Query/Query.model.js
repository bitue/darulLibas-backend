const mongoose = require('mongoose');

const querySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        status: {
            type: Boolean, // The type should be Boolean for a true/false value
            default: false // Sets the default value to false
        }
    },
    { timestamps: true }
);

const Query = mongoose.model('Query', querySchema);

module.exports = { Query };
