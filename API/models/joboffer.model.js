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
        },
        required: true
    },
    skillsRequired: [String],
    offeredBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Employer",
        required: true
    },
    applications: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "JobApplication"
    }],
    dateOffered: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    }
});

// Function for querying/searching a particular job offer based on job title
jobOfferSchema.statics.findByJobTitle = function (jobTitle) {
    return this.find({jobTitle: new RegExp(jobTitle, "i")})
};

// Function for querying/searching a particular job offer based on job category
jobOfferSchema.statics.findByJobCategory = function (jobCategory) {
    return this.find({jobCategory: new RegExp(jobCategory, "i")})
};

// Function for querying/searching a job offer based on salary
jobOfferSchema.statics.findBySalaryRange = function (min, max) {
    return this.find().where("salaryPerMonth").gte(min).lte(max)
};

const JobOffer = mongoose.model('JobOffer', jobOfferSchema);
module.exports = JobOffer;