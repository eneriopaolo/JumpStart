// Middleware for Checking Type of User & Retrieving User Data
const Employer = require('../models/employer.model');
const JobSeeker = require('../models/jobseeker.model');

const verifyEmployer = async(req, res, next) => {
    try {
    const user = await Employer.findOne({email: userEmail})
    if (!user) {
        return res.status(403).json({msg: "Invalid User."})
    }
    req.userID = user._id.toString();
    req.userName = user.name;
    next();
    } catch (err) {
        return res.status(403).json({msg: "Invalid User."})
    }
};

const verifyJobSeeker = async(req, res, next) => {
    try {
    const user = await JobSeeker.findOne({ email: userEmail })
    if (!user) {
        return res.status(403).json({msg: "Invalid User."})
    }
    req.userID = user._id.toString();
    req.userName = user.name;
    next();
    } catch (err) {
        return res.status(403).json({msg: "Invalid User."})
    }
};

module.exports = {
    verifyEmployer,
    verifyJobSeeker
}