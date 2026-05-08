const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    customer: {
        name: String,
        email: String,
        phone: String
    },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    source: { type: String, default: 'Direct' },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Interested', 'Converted', 'Lost'],
        default: 'New'
    },
    serviceInterested: {
        type: String,
        enum: ['Flight', 'Hotel', 'Tour Package', 'Visa', 'Custom'],
        required: true
    },
    notes: [{
        text: String,
        author: String,
        createdAt: { type: Date, default: Date.now }
    }],
    reminders: [{
        date: Date,
        text: String,
        completed: { type: Boolean, default: false }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
