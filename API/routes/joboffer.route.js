const express = require('express');
const router = express.Router();
const {
    postJobOffer,
    editJobOffer,
    deleteJobOffer,
    viewJobOffers, viewJobOffer,
    viewOwnOffers,
    searchJobOfferByTitle,
    searchJobOfferByCategory,
    searchJobOfferBySalary
} = require('../controllers/joboffer.controller');
const {authenticateToken} = require('../services/authtoken.service')
const {verifyEmployer} = require('../services/verifyuser.service')

// Employer Specfic Routes
router.get('/myoffer', authenticateToken, verifyEmployer, viewOwnOffers);
router.post('/', authenticateToken, verifyEmployer, postJobOffer);
router.patch('/:id', authenticateToken, verifyEmployer, editJobOffer);
router.delete('/:id', authenticateToken, verifyEmployer, deleteJobOffer);

// Common Routes
router.get('/', authenticateToken, viewJobOffers);
router.get('/:id', authenticateToken, viewJobOffer);
router.get('/search/title', authenticateToken, searchJobOfferByTitle);
router.get('/search/category', authenticateToken, searchJobOfferByCategory);
router.get('/search/salary', authenticateToken, searchJobOfferBySalary);

module.exports = router;