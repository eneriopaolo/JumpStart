const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobOfferSchema = new Schema({
    jobTitle: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    salaryPerMonth: {
        type: Number,
        required: true
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
        employerName: {
            type: String,
            required: true,
            immutable: true
        },
        employerID: {
            type: String,
            required: true,
            immutable: true
        },
        employerEmail: {
            type: String,
            required: true,
            immutable: true
        }
    },
});

const JobOffer = mongoose.model('JobOffer', jobOfferSchema);
module.exports = JobOffer;