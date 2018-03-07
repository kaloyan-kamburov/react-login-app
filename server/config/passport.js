const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');
require('dotenv').config();
const secret = process.env.SECRET;

module.exports = function(passport) {
    let opts = {};
    
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
    opts.secretOrKey = secret;
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User.getUserById(jwt_payload._doc._id);

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }

        } catch (error) {
            if (err) {
                return done(err, false);
            }
        }

    }));
    return passport;
}