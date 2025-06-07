const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("Authorization header: ", authHeader);

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({
            message: 'Unauthorized, jwt token required'
        });
    }
    
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded JWT:", decoded); // Debug log
        req.user = decoded;
        next();
    } catch (err) {
        console.error("JWT verification error:", err.message); // Debug log
        return res.status(403).json({ message: 'Unauthorized, JWT token wrong or expired' });
    }
    
};

module.exports = ensureAuthenticated;