const express = require('express');
const router = express.Router();
const {postJobOffer, editJobOffer, deleteJobOffer, viewJobOffer, viewSpecificJobOffer} = require('../controllers/joboffer.controller');
const {authenticateToken} = require('../services/authtoken.service')
const {verifyEmployer, verifyJobSeeker} = require('../services/checkusertype.service')

router.post('/', authenticateToken, verifyEmployer, postJobOffer);
router.patch('/:id', authenticateToken, verifyEmployer, editJobOffer);
router.delete('/:id', authenticateToken, verifyEmployer, deleteJobOffer);
router.get('/', authenticateToken, verifyEmployer, viewJobOffer);
router.get('/:id', authenticateToken, verifyEmployer, viewSpecificJobOffer)

module.exports = router;