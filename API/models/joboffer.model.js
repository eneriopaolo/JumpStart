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
    offeredBy: {
        employerName: {
            type: String,
            required: true
        },
        employerID: {
            type: String,
            required: true
        }
    },
});

const JobOffer = mongoose.model('JobOffer', jobOfferSchema);
module.exports = JobOffer;