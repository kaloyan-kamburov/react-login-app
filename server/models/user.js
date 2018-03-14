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
    avatar: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        required: false
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUser = function(username, email) {
    return User.findOne({ 
        $or: [
            {username: username}, 
            {email: email}
        ]
    })
}

module.exports.getUserById = function(id) {
    return User.findById(id); 
}

module.exports.updateUser = function(id, body) { 
    return User.findByIdAndUpdate(id, body, {new: true});
}

module.exports.getUserByEmail = function(email, callback) {
    return User.findOne({email: email});
}

module.exports.getAllUsers = function(callback) {
    User.find({}, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username};
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

module.exports.changePassword = async function(id, password) {
    const genSalt = await bcrypt.genSalt(10);
    const genHash = await bcrypt.hash(password, genSalt);

    return User.findByIdAndUpdate(id, {password: genHash}, {new: true});
}

module.exports.comparePassword = async function(candidatePassword, hash) {
    return bcrypt.compare(candidatePassword, hash);
}