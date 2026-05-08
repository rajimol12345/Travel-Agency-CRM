const Customer = require('../models/Customer');

// @desc    Get all customers
// @route   GET /api/customers
// @access  Private
const getCustomers = async (req, res) => {
    try {
        const keyword = req.query.keyword
            ? {
                $or: [
                    { name: { $regex: req.query.keyword, $options: 'i' } },
                    { email: { $regex: req.query.keyword, $options: 'i' } },
                ],
            }
            : {};

        const customers = await Customer.find({ ...keyword });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new customer
// @route   POST /api/customers
// @access  Private
const createCustomer = async (req, res) => {
    try {
        const customer = new Customer(req.body);
        const createdCustomer = await customer.save();
        res.status(201).json(createdCustomer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get customer by ID
// @route   GET /api/customers/:id
// @access  Private
const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (customer) {
            res.json(customer);
        } else {
            res.status(404).json({ message: 'Customer not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCustomers, createCustomer, getCustomerById };
