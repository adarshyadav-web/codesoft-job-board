const jwt = require('jsonwebtoken');

const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log("Auth Header:", authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        next(new Error("Authentication token is missing or invalid"));
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded JWT:", decoded);
        req.user = { _id: decoded.userId };
        // Attach user ID to request object
        next();
    } catch (error) {

        // console.log("JWT Verification Error:", error.message);
        next(new Error("Authentication failed"));
    }
}
module.exports = userAuth; 