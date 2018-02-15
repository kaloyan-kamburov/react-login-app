const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');

function test() {
    return  {name: 'Kaloqn', email: 'kaol@abv/bg' }
}

// Register
router.post('/register', async (req, res, next) => { 
    let newUser = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email, 
        password: req.body.password
    });

    try {
        const user = await User.getUser(req.body.username, req.body.email);
        if (!user) {
            // return res.json({
            //     success: true, 
            //     msg: 'User is unique'
            // });
            const userAdd = await User.addUser(newUser)
            if (userAdd) {
                return res.json({
                    success: true, 
                    msg: 'User registered',
                    user: userAdd
                });
            }
        } else {
            if (user.username === req.body.username) {                
                return res.json({
                    success: true, 
                    msg: 'User\'s username exists'
                });
            } else {
                return res.json({
                    success: true, 
                    msg: 'User\'s email exists'
                });
            }
        }

    } catch (err) {
        console.log(err)
        res.json({success: false, msg: '', err: err})
    }

    // try {
    //     const userName = await User.getUserByUsername(req.body.username, (err, user) => {
    //         if (err) throw err;
    //         res.json({
    //             success: true,
    //             msg: 'User found by username'
    //         })
    //     })

    //     const userEmail = await User.getUserByEmail(req.body.email, (err, user) => {
    //         if (err) throw err;
    //         res.json({
    //             success: true,
    //             msg: 'User found by email'
    //         })
    //     })
    // } catch (err) {
        
    // }
    
    // User.getUserByUsername(req.body.username, (err, user) => {
    //     if (!user) {
    //         User.getUserByEmail(req.body.email, (err, user) => {
    //             if (err) throw err;
    //             if (!user) {
    //                 User.addUser(newUser, (err, user) => {
    //                     if (err) {
    //                         res.json({success: false, msg: 'Email already exists', err: err})
    //                     } else {
    //                         res.json({success: true, msg: 'User registered', user: { name: user.name, email: user.email }});
    //                     }
    //                 });
    //             }
    //         });
            
    //     } else {
    //         console.log('dsasda1')
    //         res.json({success: false, msg: 'Username already exists', err: err})

    //     }
    // })
    
});

// authenticate
router.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'no such user'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {

            if (err) throw err;


            if (isMatch) {
                const token = jwt.sign(JSON.stringify(user), config.secret, {
                    //expiresIn: 604800 // 1 week
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