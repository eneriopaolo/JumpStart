const express = require('express');
const router = express.Router();
const {viewMyApplications, viewMyApplication, sendApplication, approveApplication, denyApplication} = require('../controllers/jobapplication.controller');
const {authenticateToken} = require('../services/authtoken.service');
const {verifyJobSeeker, verifyEmployer} = require('../services/verifyuser.service');

// Job Seeker Specific Routes
router.get('/', authenticateToken, verifyJobSeeker, viewMyApplications);
router.get('/:applicationid', authenticateToken, verifyJobSeeker, viewMyApplication);
router.post('/:offerid', authenticateToken, verifyJobSeeker, sendApplication);

// Employer Specfic Routes
router.patch('/approve/:applicationid', authenticateToken, verifyEmployer, approveApplication);
router.patch('/deny/:applicationid', authenticateToken, verifyEmployer, denyApplication);

module.exports = router;