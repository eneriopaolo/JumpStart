const express = require('express');
const router = express.Router();
const {postJobOffer, editJobOffer, deleteJobOffer, viewJobOffers, viewJobOffer} = require('../controllers/joboffer.controller');
const {authenticateToken} = require('../services/authtoken.service')
const {verifyEmployer, verifyJobSeeker} = require('../services/verifyuser.service')

// Employer Specfic Routes
router.post('/', authenticateToken, verifyEmployer, postJobOffer);
router.patch('/:id', authenticateToken, verifyEmployer, editJobOffer);
router.delete('/:id', authenticateToken, verifyEmployer, deleteJobOffer);

// Common Routes
router.get('/', authenticateToken, viewJobOffers);
router.get('/:id', authenticateToken, viewJobOffer);

module.exports = router;