const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    shop: {
        type: String,
        required: [true, 'Please select a shop'],
        enum: ['Ramu Fashions', 'Ramu Readymades'],
    },
    amount: {
        type: Number,
        required: [true, 'Please enter an amount'],
    },
    date: {
        type: Date,
        required: [true, 'Please pick a date'],
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Sale', SaleSchema);