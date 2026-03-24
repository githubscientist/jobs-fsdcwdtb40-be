const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const User = require('../models/user');

const isAuthenticated = async (req, res, next) => {
    // check if the token is present in the cookies
    const token = req.cookies && req.cookies.token;

    // if there is no token, return an unauthorized error
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // if the token is present, verify it
        const decoded = await jwt.verify(token, JWT_SECRET);

        // if the token is valid, attach the user ID to the request object
        req.userId = decoded.userId;

        // call the next middleware or route handler
        next();
    } catch (error) {
        // if the token is invalid, return an unauthorized error
        res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
}

const allowRoles = (roles) => {
    return async (req, res, next) => {
        // get the userId from the request object
        const userId = req.userId;

        // get the user's role from the database
        const user = await User.findById(userId).select('-password');

        // check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // check if the user's role is in the allowed roles
        if (!roles.includes(user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        // add the user object to the request object
        req.user = user;

        // call the next middleware or route handler
        next();
    }
}

module.exports = {
    isAuthenticated,
    allowRoles
}