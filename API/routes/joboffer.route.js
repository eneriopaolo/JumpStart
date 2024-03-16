const express = require('express');
const router = express.Router();
const {postJobOffer, editJobOffer, deleteJobOffer, viewJobOffer} = require('../controllers/jobeffer.controller');

router.post('/', postJobOffer);
router.patch('/:id', editJobOffer);
router.delete('/:id', deleteJobOffer);
router.get('/', viewJobOffer);

module.exports = router;