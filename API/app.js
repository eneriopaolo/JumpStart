// Importing of Important Modules:
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Importing of Routers:
const userAuthRoutes = require('./routes/userauth.route');
const jobOfferRoutes = require('./routes/joboffer.route');
const profileRoutes = require('./routes/profile.route');

// Middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB & Listen for Requests
const port = process.env.PORT;
const dbURI = process.env.DB_URI;
    // This is the Connection String
    // mongodb+srv://<username>:<password>
mongoose.connect(dbURI)
    .then((res) => app.listen(port, () => {
        console.log(`Hello World! Server is running on port ${port}.`);
        console.log("Successfully connected to the DB.");
    }))
    .catch((err) => {
        console.log("Failed to Connect to DB.");
    });

// Default Route
app.get('/api/', (req, res) => {
    res.send("Hello World! Server is running.");
});

// Custom Routes:
app.use('/api/auth', userAuthRoutes);
app.use('/api/job', jobOfferRoutes);
app.use('/api/profile', profileRoutes);