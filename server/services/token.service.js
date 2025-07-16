const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.JWT_ACCESS_TOKEN;
const REFRESH_SECRET = process.env.JWT_REFRESH_TOKEN;

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_SECRET, { expiresIn: '15m' });
}

function generateRefreshToken(user) {
    return jwt.sign(user, REFRESH_SECRET, { expiresIn: '7d' });
}

module.exports = { generateAccessToken, generateRefreshToken };
