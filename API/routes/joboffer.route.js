const express = require('express');
const router = express.Router();
const {postJobOffer, editJobOffer, deleteJobOffer, viewJobOffer} = require('../controllers/joboffer.controller');
const {authenticateToken} = require('../services/authtoken.service')

router.post('/', authenticateToken, postJobOffer);
router.patch('/:id', authenticateToken, editJobOffer);
router.delete('/:id', authenticateToken, deleteJobOffer);
router.get('/', authenticateToken, viewJobOffer);

module.exports = router;