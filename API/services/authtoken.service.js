// Middleware for Authenticating Tokens
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }
    
    jwt.verify(token, process.env.JWT_KEY, (err, id) => {
        if (err) {
            return res.sendStatus(403)
        } else {
            req.id = id;
            next();
        }
    })
}

module.exports = { authenticateToken }