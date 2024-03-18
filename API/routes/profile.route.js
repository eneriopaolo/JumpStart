const express = require('express');
const router = express.Router();
const {viewJobSeekerProfile, editJobSeekerProfile, viewEmployerProfile, editEmployerProfile} = require('../controllers/profile.controller');
const { authenticateToken } = require('../services/authtoken.service');
const { verifyJobSeeker, verifyEmployer } = require('../services/verifyuser.service');

router.get('/jobseeker/:id', authenticateToken, viewJobSeekerProfile);
router.patch('/jobseeker/:id', authenticateToken, verifyJobSeeker, editJobSeekerProfile);
router.get('/employer/:id', authenticateToken, viewEmployerProfile);
router.patch('/employer/:id', authenticateToken, verifyEmployer, editEmployerProfile);

module.exports = router;