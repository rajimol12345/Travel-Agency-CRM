const express = require('express');
const { getLeads, createLead, updateLeadStatus } = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(protect, getLeads)
    .post(protect, createLead);

router.route('/:id/status')
    .patch(protect, updateLeadStatus);

module.exports = router;
