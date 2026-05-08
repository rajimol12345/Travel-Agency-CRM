const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: String,
    passportDetails: {
        number: String,
        expiry: Date,
        nationality: String
    },
    travelHistory: [{
        destination: String,
        date: Date,
        status: String
    }],
    preferences: {
        destinations: [String],
        budget: String,
        travelType: String
    },
    segment: { type: String, enum: ['VIP', 'repeat', 'corporate', 'new'], default: 'new' }
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
