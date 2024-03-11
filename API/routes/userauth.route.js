const express = require('express');
const router = express.Router();
const {registerUserA, registerUserB, loginUser} = require('../controllers/userauth.controller');

router.post('/register/jobseeker', registerUserA);
router.post('/register/employer', registerUserB);
router.post('/login', loginUser);

module.exports = router;