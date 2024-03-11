const UserCredential = require('../models/usercredential.model');
const JobSeeker = require('../models/jobseeker.model');
const Employer = require('../models/employer.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Error Handler
const handleErrors = (err) => {
    let errors = { email: '', password: '', typeofuser: ''};
    
    // Incorrect Email
    if (err.message === 'Incorrect email.') {
        errors.email = 'Email entered is not yet registered.';
    }

    if (err.message === 'Incorrect password.') {
        errors.password = 'Password entered is incorrect.'
    }

    // Duplicate Error Code
    if (err.code === 11000) {
        errors.email = 'That email is already taken.'
    }
    // Validation Errors from UserCredential Schema
    if (err.message.includes('UserCredential validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
};

// Token Generation Function
const tokenValidityDuration = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.KEY, {
        expiresIn: tokenValidityDuration
    });
};

// Registation Function for Job Seekers
const registerUserA = async (req, res) => {
    const {email, name, password} = req.body;
    const typeofuser = 'jobseeker';
    try {
        const user = await UserCredential.create({email, password, typeofuser});
        const jobseeker = await JobSeeker.create({name, email});

        // Optional code snippet to allow direct login after registration.
        //const token = createToken(user._id);
        //res.cookie('userToken', token, { httpOnly: true, maxAge: maxAge * 1000});

        res.status(201).send("Successfully Registered");
    } catch (err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    };
};

// Registration Function for Employers
const registerUserB = async (req, res) => {
    const {email, name, password} = req.body;
    const typeofuser = 'employer';
    try {
        const user = await UserCredential.create({email, password, typeofuser});
        const employer = await Employer.create({name, email});

        // Optional code snippet to allow direct login after registration.
        //const token = createToken(user._id);
        //res.cookie('userToken', token, { httpOnly: true, maxAge: maxAge * 1000});

        res.status(201).send("Successfully Registered");
    } catch (err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    };
};

const loginUser = async (req, res) => {
    const {email, password} = req.body; 
    try {
        const user = await UserCredential.login(email, password);
        const token = createToken(user._id);
        res.status(200).send(token);
    } catch (err) {
        const errors = handleErrors(err);
        res.status(401).json({errors});
    };
};

module.exports = {
    registerUserA,
    registerUserB, 
    loginUser
};