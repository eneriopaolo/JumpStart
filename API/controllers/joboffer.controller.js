const JobOffer = require('../models/joboffer.model');

// Function for Viewing Employers' Job Offers
const viewJobOffers = async (req, res) => {
    try {
        const jobOffers = await JobOffer.find({});
        res.json(jobOffers.filter(jobOffers => jobOffers.offeredBy.employerEmail === userEmail))
    } catch (err) {
        console.error(err);  //For Debugging Purposes
        res.status(500).json({msg: 'Something went wrong.'});
    }
};

// Function for Viewing Specific Job Offer
const viewJobOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const jobOffer = await JobOffer.findById(id);

        if (!jobOffer) {
            return res.status(404).json({msg: "Job offer to be viewed does not exist."});
        }

        if (req.userID !== jobOffer.offeredBy.employerID) {
            return res.status(403).json({msg: 'Unauthorized Access'});
        }

        res.json(jobOffer);
    } catch (err) {
        console.error(err);  //For Debugging Purposes
        res.status(500).json({msg: 'Something went wrong.'});
    }
};

// Function for Creation of New Job Offer
const postJobOffer = async (req, res) => {
    const {jobtitle, jobdesc, salary} = req.body;
    const empid = req.userID;
    const empname = req.userName;
    const empEmail = userEmail;
    try {
        const jobOffer = await JobOffer.create({
            jobTitle: jobtitle,
            jobDescription: jobdesc,
            salaryPerMonth: salary,
            offeredBy: {
                employerName: empname,
                employerID: empid,
                employerEmail: empEmail
            }
        });
        res.status(201).json({msg: 'Successfully Posted a Job Offer.'})
    } catch (err) {
        console.error(err)  //For Debugging Purposes
        res.status(500).json({msg: 'Something went wrong.'})
    };
};

// Function for Editing An Existing Job Offer
const editJobOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const {jobdesc, salary, category, skills} = req.body;
        const jobOffer = await JobOffer.findByIdAndUpdate(id, {
            jobDescription: jobdesc,
            salaryPerMonth: salary,
            jobCategory: category,
            skillsRequired: skills
        });

        if (!jobOffer) {
            return res.status(404).json({msg: "Job offer to be updated does not exist."});
        }
        res.status(200).json({msg: "Successfully Updated Details of a Job Offer."})
    } catch (err) {
        console.error(err);  //For Debugging Purposes
        res.status(500).json({msg: 'Something went wrong.'});
    }
};

// Function for Deleting An Existing Job Offer
const deleteJobOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const jobOffer = await JobOffer.findByIdAndDelete(id);

        if (!jobOffer) {
            return res.status(404).json({msg: "Job offer to be deleted does not exist."});
        }
        res.status(200).json({msg: "Successfully Deleted a Job Offer."});
    } catch (err) {
        console.error(err);  //For Debugging Purposes
        res.status(500).json({msg: 'Something went wrong.'});
    };

};

module.exports = {
    postJobOffer,
    editJobOffer,
    deleteJobOffer,
    viewJobOffers,
    viewJobOffer
};