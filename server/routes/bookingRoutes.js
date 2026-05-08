const express = require('express');
const { getBookings, createBooking, downloadItinerary } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(protect, getBookings)
    .post(protect, createBooking);

router.get('/:id/itinerary', protect, downloadItinerary);

module.exports = router;
