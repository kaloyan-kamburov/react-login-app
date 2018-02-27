const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');

function createToken(user) {
    let newUser = Object.assign({}, user);
    // newUser.exp = 10000;

    const options = {
        algorithm: 'HS256'
    }

    return jwt.sign(JSON.stringify(newUser), secret, options)
}

module.exports = createToken;