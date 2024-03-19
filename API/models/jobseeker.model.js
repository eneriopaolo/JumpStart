const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSeekerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        immutable: true
    },
    profile: {
        bio: {
            type: String
        },
        education: {
            type: String
        },
        experience: {
            type: String
        },
        skills: [String]
    }
});

// Function for querying/searching particular job seekers
jobSeekerSchema.statics.findByName = function (name) {
    return this.find({name: new RegExp(name, "i")})
};

const JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);
module.exports = JobSeeker;