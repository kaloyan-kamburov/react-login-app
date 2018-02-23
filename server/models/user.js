const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: false
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUser = function(username, email) {
    // return {email: 'test@test.com', username: 'test'} 
    // console.log('username: ' + username) 
    // console.log('email: ' + email)
    return User.findOne({ 
        $or: [
            {username: username}, 
            {email: email}
        ]
    })
}

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback); 
}

module.exports.getAllUsers = function(callback) {
    User.find({}, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
}

module.exports.getUserByEmail = function(email, callback) {
    const query = {email: email};
    User.findOne(query, callback);
}


module.exports.addUser = async function(newUser) { 
    const genSalt = await bcrypt.genSalt(10);
    const genHash = await bcrypt.hash(newUser.password, genSalt);
    newUser.password = genHash;
    return newUser.save();
}

module.exports.deleteUser = function(id, callback) {
    User.findByIdAndRemove(id, callback);
}


module.exports.updateUser = function(id, body, callback) { 
    User.findByIdAndUpdate(id, body, callback);
}

module.exports.changePassword = function(id, password, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            User.findByIdAndUpdate(id, {password: hash}, callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash) {
    return bcrypt.compare(candidatePassword, hash);
}