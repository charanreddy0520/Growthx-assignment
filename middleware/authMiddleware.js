const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Admin = require('../models/adminModel');

const auth = async (req, res, next) => {
    try {
        // Extract token from the headers
        const token = req.header('Authorization').replace('Bearer ', '');

        // Verify the token using JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user or admin based on the decoded token
        let user = await User.findById(decoded.id);
        if (!user) {
            user = await Admin.findById(decoded.id);
            if (!user) {
                return res.status(401).json({ message: 'Authentication failed' });
            }
        }

        // Attach user details to the request object
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

module.exports = auth;
