const jwt = require('jsonwebtoken');

// Verify JWT middleware
exports.verifyJWT = async (req, res, next) => {
    try {
        // Get the JWT from the request header
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(401).send('No token provided');
        }
        // Verify the JWT
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        // Set the user ID in the request object
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(500).send('Invalid token');
    }
};

exports.isOwner = (req, res, next) => {
    if (req.params.id === req.userId) {
        next();
    } else {
        return res.status(403).send('Forbidden');
    }
}
