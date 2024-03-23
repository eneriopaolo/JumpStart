const express = require('express');
const router = express.Router();
const {
    postJobOffer,
    editJobOffer,
    deleteJobOffer,
    viewJobOffers, viewJobOffer,
    viewOwnOffers, viewOneOffer,
    searchJobOfferByTitle,
    searchJobOfferByCategory,
    searchJobOfferBySalary
} = require('../controllers/joboffer.controller');
const {authenticateToken} = require('../services/authtoken.service')
const {verifyEmployer} = require('../services/verifyuser.service')

// Employer Specfic Routes
router.post('/', authenticateToken, verifyEmployer, postJobOffer);
router.get('/myoffer', authenticateToken, verifyEmployer, viewOwnOffers);
router.get('/myoffer/:offerid', authenticateToken, verifyEmployer, viewOneOffer);
router.patch('/myoffer/:offerid', authenticateToken, verifyEmployer, editJobOffer);
router.delete('/myoffer/:offerid', authenticateToken, verifyEmployer, deleteJobOffer);

// Common Routes
router.get('/', authenticateToken, viewJobOffers);
router.get('/:offerid', authenticateToken, viewJobOffer);
router.post('/search/title', authenticateToken, searchJobOfferByTitle);
router.post('/search/category', authenticateToken, searchJobOfferByCategory);
router.post('/search/salary', authenticateToken, searchJobOfferBySalary);

module.exports = router;