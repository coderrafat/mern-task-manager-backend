const jwt = require('jsonwebtoken')

//!Create Token
exports.createToken = async (email, user_id, expires) => {
    return jwt.sign(
        { email: email, id: user_id }, process.env.JWT_KEY, { expiresIn: expires })
}