// Middleware for Authenticating Tokens & Returning User Email
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }
    
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        userEmail = decodedToken.email;
        next();
    } catch (err) {
        return res.sendStatus(403)
    };
};

module.exports = { authenticateToken }