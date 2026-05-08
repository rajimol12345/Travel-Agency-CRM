const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
        type: String,
        enum: ['Flight', 'Hotel', 'Tour Package', 'Visa'],
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending'
    },
    details: mongoose.Schema.Types.Mixed,
    totalAmount: { type: Number, required: true },
    paidAmount: { type: Number, default: 0 },
    documents: [{
        name: String,
        url: String,
        type: String
    }],
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Pending', 'Partial'],
        default: 'Pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
