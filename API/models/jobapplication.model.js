const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobApplicationSchema = new Schema({
    jobTitle: {
        type: String,
        required: true
    },
    offeredBy: {
        type: String,
        required: true
    },
    applicantName: {
        type: String,
        required: true
    },
    applicationDate: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    applicationStatus: {
        type: String,
        enum: {
            values: ["Pending", "Denied", "Accepted"],
            message: "Invalid Status.",
            default: "Pending"
        }
    }
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);
module.exports = JobApplication;