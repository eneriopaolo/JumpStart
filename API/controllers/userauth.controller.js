const UserCredential = require('../models/usercredential.model');
const JobSeeker = require('../models/jobseeker.model');
const Employer = require('../models/employer.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Error Handler
const handleErrors = (err) => {
    // Declaration of Extra Properties of Error Object
    let errors = { email: '', password: '', typeofuser: ''};
    
    // Incorrect Email Error
    if (err.message === 'Incorrect email.') {
        errors.email = 'Email entered is not yet registered.';
    }

    // Incorrect Password Error
    if (err.message === 'Incorrect password.') {
        errors.password = 'Password entered is incorrect.'
    }

    // Duplicate Error Code Message
    if (err.code === 11000) {
        errors.email = 'That email is already taken.'
    }
    // Validation Errors from UserCredential Schema
    if (err.message.includes('UserCredential validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    console.log(errors)
    return errors;
};

// Token Generation Function
const tokenValidityDuration = 3 * 24 * 60 * 60;
const createToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_KEY, {
        expiresIn: tokenValidityDuration
    });
};

// Registation Function for Job Seekers
const registerUser = async (req, res) => {
    const {email, name, password, typeofuser} = req.body;
    try {
        const user = await UserCredential.create({email, password, typeofuser});
        if (typeofuser === 'jobseeker') {
            const jobseeker = await JobSeeker.create({name, email});
        }
        else if (typeofuser === 'employer') {
            const employer = await Employer.create({name, email});
        }
        res.status(201).json({msg: "Successfully Registered"});
    } catch (err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    };
};

// Login Function for Both Users. Returns Token, userType, and userData.
const loginUser = async (req, res) => {
    const {email, password} = req.body; 
    try {
        const user = await UserCredential.login(email, password);
        const token = createToken(user.email);
        let data = {}
        const userType = user.typeofuser;
        if (userType === 'jobseeker') {
            data = await JobSeeker.findOne({email: email});
        }
        if (userType === 'employer') {
            data = await Employer.findOne({email: email});
        }
        res.status(200).json({
            token: token,
            userType: userType,
            userData: data
        });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(401).json({errors});
    };
};

module.exports = {
    registerUser,
    loginUser
};