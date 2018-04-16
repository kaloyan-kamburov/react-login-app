const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true,
        min: [6, 'Too few eggs']
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
        required: true
    },
    roles: {
        type: Array,
        required: false
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

// User.collection.ensureIndex({
//     username : 'text'
// }, function(error, res) {
//     if(error){
//         return console.error('failed ensureIndex with error', error);
//     }
//     console.log('ensureIndex succeeded with response', res);
// });    


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

module.exports.getUserByEmail = function(email) {
    return User.findOne({email: email});
}

module.exports.getAllUsers = function() {
    return User.find({}).where('roles').nin(['admin']);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
}

module.exports.getUserBySearchField = function(query) {
    return User.find({ [query.searchField]: { $regex: new RegExp(query.searchValue, 'i'), $options: '$i' }}).where('roles').nin(['admin']);
    

    // User.find({ $text : { $search: { $regex: query.searchString, $options: '$i' } } }, function (err, user) {
    //     console.log('x: ')
    //     console.log(user)
    // });
}

module.exports.addUser = async function(newUser) { 
    const genSalt = await bcrypt.genSalt(10);
    const genHash = await bcrypt.hash(newUser.password, genSalt);
    newUser.password = genHash;
    return newUser.save();
}

module.exports.deleteUser = function(id) {
    return User.findByIdAndRemove(id);
}

module.exports.changePassword = async function(id, password) {
    const genSalt = await bcrypt.genSalt(10);
    const genHash = await bcrypt.hash(password, genSalt);

    return User.findByIdAndUpdate(id, {password: genHash}, {new: true});
}

module.exports.comparePassword = async function(candidatePassword, hash) {
    return bcrypt.compare(candidatePassword, hash);
}