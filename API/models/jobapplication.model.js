const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const JobOffer = require('./joboffer.model');

const jobApplicationSchema = new Schema({
    applicant: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "JobSeeker",
        required: true
    },
    jobOffer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "JobOffer",
        required: true
    },
    applicationDate: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    applicationStatus: {
        type: String,
        default: "Pending",
        enum: {
            values: ["Pending", "Denied", "Accepted"],
            message: "Invalid Status."
        }
    }
});

// Method for appending job application to job offer applications field
jobApplicationSchema.pre('save', async function (next){
    const apply = await JobOffer.findByIdAndUpdate(this.jobOffer._id.toString(), {
        $push: {"applications": this._id.toString()}
    })
    next();
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);
module.exports = JobApplication;