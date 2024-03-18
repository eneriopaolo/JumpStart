// Middleware for Checking Type of User & Retrieving User Data
const Employer = require('../models/employer.model');
const JobSeeker = require('../models/jobseeker.model');

const verifyEmployer = async(req, res, next) => {
    try {
    const user = await Employer.findOne({email: userEmail})
    userData = user;
    if (!user) {
        return res.status(403).json({msg: "Unauthorized Access: Not an employer."})
    }
    next();
    } catch (err) {
        return res.status(403).json({msg: "Invalid User."})
    }
};

const verifyJobSeeker = async(req, res, next) => {
    try {
    const user = await JobSeeker.findOne({ email: userEmail })
    userData = user;
    if (!user) {
        return res.status(403).json({msg: "Unauthorized Access: Not a job seeker."})
    }
    next();
    } catch (err) {
        return res.status(403).json({msg: "Invalid User."})
    }
};

module.exports = {
    verifyEmployer,
    verifyJobSeeker
}