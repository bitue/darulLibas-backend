const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
    {
        admin: {
            type: String,
            trim: true,
            min: [3, 'at least 3 character of admin name'],
            required: [true, 'admin name is required '],
            unique: true
        },
        password: {
            type: String,
            min: [6, 'password should be minimum 6 length'],
            required: true
        },
        phone: {
            type: String,
            required: true,
            unique: [true, 'Phone number is already used !']
        },

        role: {
            type: String,
            default: 'admin'
        }
    },
    { timestamps: true }
);

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
