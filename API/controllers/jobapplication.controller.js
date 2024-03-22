const JobApplication = require ('../models/jobapplication.model');
const JobOffer = require('../models/joboffer.model');
const mongoose = require('mongoose');

// JOB SEEKER: Function for viewing own applications
const viewMyApplications = async (req, res) => {
    try {
        const applications = await JobApplication.find().populate("applicant").populate("jobOffer");
        res.status(200).json(applications.filter(applications => applications.applicant._id.toString() === userData._id.toString()));
    } catch (err) {
        res.status(500).json({msg: "Something went wrong."})
    }
};

// JOB SEEKER: Function for viewing own specific application
const viewMyApplication = async (req, res) => {
    try {
        const { applicationid } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(applicationid)) {
            return res.status(404).json({msg: "Application does not exist"})
        }
        
        const application = await JobApplication.findById(applicationid).populate("jobOffer");
        
        if (!application) {
            return res.status(404).json({msg: "Application does not exist"})
        }
        if (application.applicant._id.toString() !== userData._id.toString()) {
            return res.status(403).json({msg: "Unauthorized Access"})
        }

        res.status(200).json(application)
    } catch (err) {
        res.status(500).json({msg: "Something went wrong."})
    }
};

// JOB SEEKER: Function for applying to a specific job offer
const sendApplication = async (req, res) => {
    try {
        const { offerid } = req.params;

        if (!mongoose.Types.ObjectId.isValid(offerid)) {
            return res.status(404).json({msg: "Job offer does not exist."})
        }

        const jobOffer = await JobOffer.findById(offerid)
        if (!jobOffer) {
            return res.status(404).json({msg: "Job offer does not exist."})
        }

        const application = await JobApplication.create({
            applicant: userData._id.toString(),
            jobOffer: offerid
        })
        res.status(201).json({msg: "Successfully sent a job application."})
    } catch (err) {
        res.status(500).json({msg: "Something went wrong."})
    }
};

// EMPLOYER: Function for approving a job application
const approveApplication = async (req, res) => {
    try {
        const { applicationid } = req.params;

        if (!mongoose.Types.ObjectId.isValid(applicationid)) {
            return res.status(404).json({msg: "Application does not exist."})
        }

        const application = await JobApplication.findById(applicationid).populate("jobOffer")
        if (!application) {
            return res.status(404).json({msg: "Application does not exist."})
        }
        if (application.jobOffer.offeredBy._id.toString() !== userData._id.toString()) {
            return res.status(403).json({msg: "Unauthorized Access"})
        }

        const response = await JobApplication.findByIdAndUpdate(applicationid, {
            applicationStatus: "Accepted"
        })

        res.status(201).json({msg: "Successfully approved the application."})
    } catch (err) {
        res.status(500).json({msg: "Something went wrong."})
    }
};

// EMPLOYER: Function for denying a job application
const denyApplication = async (req, res) => {
    try {
        const { applicationid } = req.params;

        if (!mongoose.Types.ObjectId.isValid(applicationid)) {
            return res.status(404).json({msg: "Application does not exist."})
        }

        const application = await JobApplication.findById(applicationid).populate("jobOffer")
        if (!application) {
            return res.status(404).json({msg: "Application does not exist."})
        }
        if (application.jobOffer.offeredBy._id.toString() !== userData._id.toString()) {
            return res.status(403).json({msg: "Unauthorized Access"})
        }

        const response = await JobApplication.findByIdAndUpdate(applicationid, {
            applicationStatus: "Denied"
        })

        res.status(201).json({msg: "Successfully denied the application."})
    } catch (err) {
        res.status(500).json({msg: "Something went wrong."})
    }
};

module.exports = {
    viewMyApplications,
    viewMyApplication,
    sendApplication,
    approveApplication,
    denyApplication
};