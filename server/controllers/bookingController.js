const Booking = require('../models/Booking');
const { generateItineraryPDF } = require('../utils/itineraryGenerator');
const path = require('path');
const fs = require('fs');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('customer', 'name email').populate('agent', 'name');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
    try {
        const bookingData = { ...req.body, agent: req.user._id };
        const booking = new Booking(bookingData);
        const createdBooking = await booking.save();
        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Download Booking Itinerary
// @route   GET /api/bookings/:id/itinerary
// @access  Private
const downloadItinerary = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('customer', 'name email');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const fileName = `itinerary-${booking._id}.pdf`;
        const filePath = path.join(__dirname, '../uploads', fileName);

        await generateItineraryPDF(booking, filePath);

        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error('Download Error:', err);
            }
            // Delete file after download
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getBookings, createBooking, downloadItinerary };
