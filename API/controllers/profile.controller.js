const JobSeeker = require('../models/jobseeker.model');
const Employer = require('../models/employer.model');


// Function for Viewing a Job Seeker's Profile
const viewJobSeekerProfile = async(req, res) => {
    try {
        const { id } = req.params;
        const userProfile = await JobSeeker.findById(id);

        if (!userProfile) {
            return res.status(404).json({msg: "Job Seeker does not exist."})
        }
    
        res.json(userProfile);
    } catch (err) {
        res.status(500).json({msg: "Something went wrong."})
    }
};

// Function for Editing Job Seeker's Profile
const editJobSeekerProfile = async(req, res) => {
    try {
        const { id } = req.params;
        const userProfile = await JobSeeker.findOneAndUpdate({_id: id}, {
            ...req.body
        })

        res.status(201).json({msg: "Successfully edited profile."})
    } catch (err) {
        res.status(500).json({msg: "Something went wrong."})
    };
};

// Function for Viewwing an Employer's Profile
const viewEmployerProfile = async(req, res) => {
    try {
        const { id } = req.params;
        const userProfile =  await Employer.findById(id);

        if (!userProfile) {
            return res.status(404).json({msg: "Employer does not exist."})
        }

        res.json(userProfile);
    } catch (err) {
        res.status(500).json({msg: "Something went wrong."})
    }
};

// Function for Editing Employer's Profile
const editEmployerProfile = async(req, res) => {
    try {
        const { id } = req.params;
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