const express = require('express');
const { getCustomers, createCustomer, getCustomerById } = require('../controllers/customerController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(protect, getCustomers)
    .post(protect, createCustomer);

router.route('/:id')
    .get(protect, getCustomerById);

module.exports = router;
