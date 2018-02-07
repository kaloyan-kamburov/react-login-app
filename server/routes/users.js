const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => { 
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: 'cici'
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Failed to register user', err: err})
        } else {
            res.json({success: true, msg: 'User registered', user: { name: user.name, email: user.email }});
        }
    });
});

// authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'no such user'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token, 
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        isAdmin: user.isAdmin
                    }
                });
            } else {
                return res.json({success: false, msg: 'wrong password'});
            }

            
        });
    });
});

// profile 
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    console.log('USER: ')
    console.log(req.user);
    res.json({user: req.user})
});

// all users
router.get('/all', passport.authenticate('jwt', {session: false}), (req, res, next) => {    
    User.getAllUsers((err, users) => {
        if (err) throw err;
        res.json(users);
    });
});

// get edit user
router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    User.getUserById(req.params.id, (err, user) => { 
        if (err) throw err;
        res.json(user);
    });
});

// update user
router.put('/:id/update', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    User.updateUser(req.params.id, {$set: req.body}, (err, result) => {
        if (err) throw err;
        res.send('User updated.');
    })
});

// change password
router.put('/:id/changepassword', passport.authenticate('jwt', {session: false}), (req, res, next) => {

        // User.getUserById(req.params.id, (err, user) => { 
        //     if (err) throw err; 
            
        //     console.log('USER: ');
        //     console.log(user.isAdmin); 
        //     console.log('ID: ');
        //     console.log(req.params.id);
        //     console.log('PASSPORT ID: ');
        //     // console.log(passport.);
           

        // });

    User.changePassword(req.params.id, req.body.password, (err, result) => {
        if (err) throw err;
        res.send('Password updated.');
    });
});
 
//delete user
router.delete('/:id/delete', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    User.deleteUser(req.params.id, (err, result) => {
        if (err) throw err;
        res.send('User deleted.');
    })
});

module.exports = router;