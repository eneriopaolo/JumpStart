// Importing of Important Modules:
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// Importing of Routers:
const userAuthRoutes = require('./routes/userauth.route');

// Middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB & Listen for Requests
const port = 3000;
const dbURI = "mongodb+srv://paoloenerio:om77nRNxfqImealf@backenddb.2wehfx7.mongodb.net/OurDatabase";
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