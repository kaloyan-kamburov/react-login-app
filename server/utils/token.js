const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');

function createToken(user) {
    const options = {
        algorithm: 'HS256',
        // expiresIn: 604800
    }

    return jwt.sign(JSON.stringify(user), secret, options)
}

module.exports = createToken;