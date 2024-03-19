const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        immutable: true
    },
    profile: {
        address: {
            type: String
        },
        description: {
            type: String
        }
    }
});

// Function for querying/searching specific employers
employerSchema.statics.findByName = function (name) {
    return this.find({name: new RegExp(name, "i")})
};

const Employer = mongoose.model('Employer', employerSchema);
module.exports = Employer;