// Middleware for Authenticating Tokens & Returning User Email
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({msg: "Unauthorized Access: Token is null."});
    }
    
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        userEmail = decodedToken.email;
        next();
    } catch (err) {
        return res.status(403).json({msg: "Unauthorized Access: Token value is invalid."})
    };
};

module.exports = { authenticateToken }