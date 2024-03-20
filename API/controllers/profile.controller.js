const JobSeeker = require('../models/jobseeker.model');
const Employer = require('../models/employer.model');
const mongoose = require('mongoose');

// Function for Viewing a Job Seeker's Profile
const viewJobSeekerProfile = async(req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({msg: "Job Seeker does not exist."})
        }

        const userProfile = await JobSeeker.findById(id);

        if (!userProfile) {
            return res.status(404).json({msg: "Job Seeker does not exist."})
        }
    
        res.status(200).json(userProfile);
    } catch (err) {
        res.status(500).json({msg: "Something went wrong."})
    }
};

// Function for Editing Job Seeker's Profile
const editJobSeekerProfile = async(req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({msg: "Job Seeker does not exist."})
        }

        if (id !== userData._id.toString()) {
            return res.status(403).json({msg: "Unauthorized Access."})
        }

        const userProfile = await JobSeeker.findOneAndUpdate({_id: id}, {
            ...req.body
        });

        res.status(201).json({msg: "Successfully edited profile."})
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: "Something went wrong."})
    };
};

// Function for Viewwing an Employer's Profile
const viewEmployerProfile = async(req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({msg: "Employer does not exist."})
        }

        const userProfile =  await Employer.findById(id);

        if (!userProfile) {
            return res.status(404).json({msg: "Employer does not exist."})
        }

        res.status(200).json(userProfile);
    } catch (err) {
        res.status(500).json({msg: "Something went wrong."})
    }
};

// Function for Editing Employer's Profile
const editEmployerProfile = async(req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({msg: "Employer does not exist."})
        }

        if (id !== userData._id.toString()) {
            return res.status(403).json({msg: "Unauthorized Access."})
        }

        const userProfile = await Employer.findOneAndUpdate({_id: id}, {
            ...req.body
        })

        res.status(201).json({msg: "Successfully edited profile."})
    } catch (err) {
        res.status(500).json({msg: "Something went wrong."})
    };
};

module.exports = {
    viewJobSeekerProfile,
    editJobSeekerProfile,
    viewEmployerProfile,
    editEmployerProfile
};