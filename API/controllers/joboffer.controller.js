const JobOffer = require('../models/joboffer.model');

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
        res.status(201).send('Successfully Posted a Job Offer.')
    } catch (err) {
        console.error(err)  //For Debugging Purposes
        res.status(500).send('Something went wrong.')
    };
};

// Function for Editing An Existing Job Offer
const editJobOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const {jobdesc, salary} = req.body;
        const jobOffer = await JobOffer.findByIdAndUpdate(id, {
            jobDescription: jobdesc,
            salaryPerMonth: salary
        });

        if (!jobOffer) {
            return res.status(404).send("Job offer to be updated does not exist.");
        }
        res.status(200).send("Successfully Updated Details of a Job Offer.")
    } catch (err) {
        console.error(err);  //For Debugging Purposes
        res.status(500).send('Something went wrong.');
    }
};

// Function for Deleting An Existing Job Offer
const deleteJobOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const jobOffer = await JobOffer.findByIdAndDelete(id);

        if (!jobOffer) {
            return res.status(404).send("Job offer to be deleted does not exist.");
        }
        res.status(200).send("Successfully Deleted a Job Offer.");
    } catch (err) {
        console.error(err);  //For Debugging Purposes
        res.status(500).send('Something went wrong.');
    };

};

// Function for Viewing Employers' Job Offers
const viewJobOffer = async (req, res) => {
    try {
        const jobOffers = await JobOffer.find({});
        res.json(jobOffers.filter(jobOffers => jobOffers.offeredBy.employerEmail === userEmail))
    } catch (err) {
        console.error(err) //For Debugging Purposes
    }
};

module.exports = {
    postJobOffer,
    editJobOffer,
    deleteJobOffer,
    viewJobOffer
};