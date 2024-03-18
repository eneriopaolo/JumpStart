const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobOfferSchema = new Schema({
    jobTitle: {
        type: String,
        required: [true, "Please enter a job title."]
    },
    jobDescription: {
        type: String,
        required: [true, "Please enter a job description."]
    },
    salaryPerMonth: {
        type: Number,
        required: [true, "Please enter salary amount."],
    },
    jobCategory: {
        type: String,
        enum: {
            values: ["Entry", "Intermediate", "Expert"],
            message: "Invalid Category."
        }
    },
    skillsRequired: [String],
    offeredBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Employer",
        required: true,
        immutable: true
    }
});

const JobOffer = mongoose.model('JobOffer', jobOfferSchema);
module.exports = JobOffer;