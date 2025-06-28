const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).json({ status: 0, message: "No Token Provider" });

    const token = authHeader.split(' ')[1];

    try {
        const decoder = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        req.user = decoder.id;
        next();
    } catch (err) {
        return res.status(500).json({ status: 0, message: "Token is Invalid" });
    }
}

module.exports = auth;