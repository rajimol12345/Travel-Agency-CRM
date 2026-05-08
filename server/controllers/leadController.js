const Lead = require('../models/Lead');
const Customer = require('../models/Customer');
const sendEmail = require('../utils/emailHelper');

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private
const getLeads = async (req, res) => {
    try {
        const keyword = req.query.keyword
            ? {
                $or: [
                    { 'customer.name': { $regex: req.query.keyword, $options: 'i' } },
                    { 'customer.email': { $regex: req.query.keyword, $options: 'i' } },
                    { serviceInterested: { $regex: req.query.keyword, $options: 'i' } },
                ],
            }
            : {};

        const leads = await Lead.find({ ...keyword }).populate('agent', 'name email');
        res.json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new lead
// @route   POST /api/leads
// @access  Private
const createLead = async (req, res) => {
    try {
        const { customerId, ...rest } = req.body;
        const leadData = { ...rest, agent: req.user._id };

        if (customerId) {
            leadData.customerId = customerId;
            // If embedded customer data isn't provided, fetch it from the Customer model
            if (!leadData.customer) {
                const customer = await Customer.findById(customerId);
                if (customer) {
                    leadData.customer = {
                        name: customer.name,
                        email: customer.email,
                        phone: customer.phone
                    };
                }
            }
        }

        const lead = new Lead(leadData);
        const createdLead = await lead.save();

        // Automation: Send follow-up email if customer email exists
        if (createdLead.customer && createdLead.customer.email) {
            try {
                await sendEmail({
                    email: createdLead.customer.email,
                    subject: 'We Received Your Inquiry!',
                    message: `Hi ${createdLead.customer.name}, thank you for reaching out. An agent will contact you soon regarding your ${createdLead.serviceInterested} query.`,
                });
            } catch (err) {
                console.error('Automation Email Error:', err);
            }
        }

        res.status(201).json(createdLead);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update lead status
// @route   PATCH /api/leads/:id/status
// @access  Private
const updateLeadStatus = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (lead) {
            lead.status = req.body.status;
            const updatedLead = await lead.save();
            res.json(updatedLead);
        } else {
            res.status(404).json({ message: 'Lead not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getLeads, createLead, updateLeadStatus };
