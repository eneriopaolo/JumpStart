const JobOffer = require('../models/joboffer.model');
const mongoose = require('mongoose');
const validator = require('validator');

// Function for Viewing All Job Offers
const viewJobOffers = async (req, res) => {
    try {
        const jobOffers = await JobOffer.find().populate("offeredBy");
        res.status(200).json(jobOffers);
    } catch (err) {
        res.status(500).json({msg: 'Something went wrong.'});
    };
};

// Function for Viewing Specific Job Offer
const viewJobOffer = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({msg: "Job offer to be viewed does not exist."})
        }

        const jobOffer = await JobOffer.findById(id).populate("offeredBy");

        if (!jobOffer) {
            return res.status(404).json({msg: "Job offer to be viewed does not exist."});
        }

        res.status(200).json(jobOffer);
    } catch (err) {
        res.status(500).json({msg: 'Something went wrong.'});
    };
};

// Function for Searching Job Offers Based on Job Title
const searchJobOfferByTitle = async (req, res) => {
    try {
        const { jobTitle } = req.body;
        const jobOffers = await JobOffer.findByJobTitle(jobTitle).populate("offeredBy");
        res.status(200).json(jobOffers);
    } catch (err) { 
        res.status(500).json({msg: 'Something went wrong.'});
    };
};

// Function for Searching Job Offers Based on Job Category
const searchJobOfferByCategory = async (req, res) => {
    try {
        const { jobCategory } = req.body;
        const jobOffers = await JobOffer.findByJobCategory(jobCategory).populate("offeredBy");
        res.status(200).json(jobOffers);
    } catch (err) {
        res.status(500).json({msg: 'Something went wrong.'});
    };
};

// Function for Searching Job Offers Based on Salary Range
const searchJobOfferBySalary = async (req, res) => {
    try {
        const { min, max} = req.body;
        if (validator.isNumeric(min) === false) {
            return res.status(400).json({msg: "Invalid input. Salary value should be numeric."})
        }

        if (validator.isNumeric(max) === false) {
            return res.status(400).json({msg: "Invalid input. Salary value should be numeric."})
        }
        const jobOffers = await JobOffer.findBySalaryRange(min, max).populate("offeredBy");
        res.status(200).json(jobOffers)
    } catch (err) {
        console.log(err)
        res.status(500).json({msg: 'Something went wrong.'});
    };
};

// EMPLOYER: Function for Viewing Own Job Offers
const viewOwnOffers = async (req, res) => {
    try {
        const jobOffers = await JobOffer.find().populate("offeredBy");
        res.status(200).json(jobOffers.filter(jobOffers => jobOffers.offeredBy._id.toString() === userData._id.toString()))
    } catch (err) {
        res.status(500).json({msg: 'Something went wrong.'});
    };
};

// EMPLOYER: Function for Creation of New Job Offer
const postJobOffer = async (req, res) => {
    const {jobtitle, jobdesc, salary} = req.body;
    try {
        const jobOffer = await JobOffer.create({
            jobTitle: jobtitle,
            jobDescription: jobdesc,
            salaryPerMonth: salary,
            offeredBy: userData._id.toString()
        });
        res.status(201).json({msg: 'Successfully Posted a Job Offer.'})
    } catch (err) {
        res.status(500).json({msg: 'Something went wrong.'})
    };
};

// EMPLOYER: Function for Editing An Existing Job Offer
const editJobOffer = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({msg: "Job offer to be updated does not exist."})
        }
        
        const offer = await JobOffer.findById(id)
        if (!offer) {
            return res.status(404).json({msg: "Job offer to be updated does not exist."});
        }
        if (offer.offeredBy._id.toString() !== userData._id.toString()) {
            return res.status(403).json({msg: "Unauthorized Access"})
        }

        const jobOffer = await JobOffer.findOneAndUpdate({_id: id}, {
            ...req.body
        });

        res.status(200).json({msg: "Successfully Updated Details of a Job Offer."})
    } catch (err) {
        res.status(500).json({msg: 'Something went wrong.'});
    };
};

// EMPLOYER: Function for Deleting An Existing Job Offer
const deleteJobOffer = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({msg: "Job offer to be deleted does not exist."})
        }

        const offer = await JobOffer.findById(id)
        if (!offer) {
            return res.status(404).json({msg: "Job offer to be deleted does not exist."});
        }
        if (offer.offeredBy._id.toString() !== userData._id.toString()) {
            return res.status(403).json({msg: "Unauthorized Access"})
        }

        const jobOffer = await JobOffer.findByIdAndDelete(id);

        res.status(200).json({msg: "Successfully Deleted a Job Offer."});
    } catch (err) {
        res.status(500).json({msg: 'Something went wrong.'});
    };

};

module.exports = {
    postJobOffer,
    editJobOffer,
    deleteJobOffer,
    viewJobOffers,
    viewJobOffer,
    viewOwnOffers,
    searchJobOfferByTitle,
    searchJobOfferByCategory,
    searchJobOfferBySalary
};