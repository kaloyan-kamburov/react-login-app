const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');
require('dotenv').config();
const secret = process.env.SECRET;

const createToken = require('../utils/token');

// Register
router.post('/register', async (req, res, next) => { 
    const newUser = new User({
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
            const userAdd = await User.addUser(newUser)
            if (userAdd) {
                const token = createToken(userAdd);
                return res.json({
                    success: true, 
                    msg: 'User registered',
                    user: userAdd,
                    token: token
                });
            }
        } else {
            let errorType,
            msgText = () => {
                if (user.username === req.body.username && user.email === req.body.email) {
                    errorType = ['username', 'email']
                    return 'Username and email exists';
                }
                if (user.username === req.body.username) {
                    errorType = ['username'];
                    return 'Username exists';
                }
                if (user.email === req.body.email) {
                    errorType = ['email'];
                    return 'Email exists';
                }
            }
            return res.json({ 
                success: false, 
                msg: msgText(),
                errorType,
                user: {}
            });
        }

    } catch (err) {
        console.log('ERROR:')
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

// Authenticate
router.post('/authenticate', async (req, res, next) => {
    try {
        const user = await User.getUser(req.body.userOrEmail, req.body.userOrEmail);
        if (!user) {
            return res.json({
                success: false,
                msg: 'Incorrect login credentials'
            });
        } else {
            
            try {
                const isMatch = await User.comparePassword(req.body.password, user.password)
                if (isMatch) {
                    const token = createToken(user);                        
                    return res.json({
                        success: true,
                        user,
                        token
                    });
                }
                return res.json({
                    success: false,
                    msg: 'Incorrect login credentials'
                });
            } catch (error) {
                console.log('ERROR:')
                console.log(error)
                return res.json({success: false, msg: '', error: error})
            }
           
        }
        
    } catch(error) {
        console.log('ERROR:')
        console.log(error)
        return res.json({success: false, msg: '', error: error})
    }
});

// Get user
router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const user = await User.getUserById(req.params.id)
        if (user) {
            return res.json({
                success: true,                
                user
            });
        } else {
            return res.json({
                success: false,
                msg: 'User not found'
            });
        }
    } catch(error) {
        return res.json({
            success: false, 
            msg: 'Error getting user', 
            err: err
        })
    }
}); 

//Update user
router.put('/update/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const userByEmail = await User.getUserByEmail(req.body.email);
        if (userByEmail && userByEmail.id == req.params.id) {
            const user = await User.updateUser(req.params.id, {$set: req.body});
            if (user) {
                return res.json({
                    success: true,                
                    user,
                    msg: 'User updated'
                });
            } else {
                return res.json({
                    success: false,
                    msg: 'User not found'
                });
            } 
        }
        return res.json({
            success: false,
            msg: 'User email exists'
        });

    } catch(error) {
        return res.json({
            success: false,
            error: error,
            msg: 'Error while updating user'
        })
    }    
});

router.put('/changepassword/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const user = await User.getUserById(req.params.id);

        if (user) {
            try {
                const passCompare = await User.comparePassword(req.body.oldPassword, user.password);
            
                if (passCompare) {

                    try {
                        const newPass = await User.changePassword(req.params.id, req.body.newPassword);
                    
                        if (newPass) {
                            return res.json({
                                succes: true,
                                msg: 'Password changed'
                            });
                        } else {
                            return res.json({
                                succes: false,
                                msg: 'Password didn\'t changed'
                            });
                        }
                    } catch (error) {
                        return res.json({
                            succes: false,
                            msg: 'Password didn\'t updated'
                        });

                    }

                } else {
                    
                    return res.json({
                        succes: false,
                        msg: 'Password doesn\'t match'
                    });
                }
            } catch(error) {
                return res.json({
                    succes: false,
                    msg: 'Error occured'
                });
            }
        }

        
        
        
        

    } catch (error) {

        return res.json({
            succes: false,
            msg: 'User not found',
            error
        });

    }
});

// router.put('/:id/update', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    
//     console.log(req.params.id)
    
//     // User.updateUser(req.params.id, {$set: req.body}, (err, result) => {
//     //     if (err) throw err;
//     //     res.send('User updated.');
//     // })
// });


// // authenticate
// router.post('/authenticate', (req, res, next) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     User.getUserByEmail(email, (err, user) => {
//         if (err) throw err;
//         if (!user) {
//             return res.json({success: false, msg: 'no such user'});
//         }

//         User.comparePassword(password, user.password, (err, isMatch) => {

//             if (err) throw err;


//             if (isMatch) {
//                 const token = jwt.sign(JSON.stringify(user), config.secret, {
//                     //expiresIn: 604800 // 1 week
//                 });

//                 res.json({
//                     success: true,
//                     token: 'JWT ' + token, 
//                     user: {
//                         id: user._id,
//                         name: user.name,
//                         username: user.username,
//                         email: user.email,
//                         isAdmin: user.isAdmin
//                     }
//                 });
//             } else {
//                 return res.json({success: false, msg: 'wrong password'});
//             }

            
//         });
//     });
// });

// //check token
// router.post('/validateToken', passport.authenticate('jwt', {session: false}), (req, res, next) => {
//     res.json({user: req.user})
// });

// // profile 
// router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
//     console.log('USER: ')
//     console.log(req.user);
//     res.json({user: req.user})
// });

// // all users
// router.get('/all', passport.authenticate('jwt', {session: false}), (req, res, next) => {    
//     User.getAllUsers((err, users) => {
//         if (err) throw err;
//         res.json(users);
//     });
// });

// // get edit user
// router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
//     User.getUserById(req.params.id, (err, user) => { 
//         if (err) throw err;
//         res.json(user);
//     });
// });

// // update user
// router.put('/:id/update', passport.authenticate('jwt', {session: false}), (req, res, next) => {
//     User.updateUser(req.params.id, {$set: req.body}, (err, result) => {
//         if (err) throw err;
//         res.send('User updated.');
//     })
// });

// // change password
// router.put('/:id/changepassword', passport.authenticate('jwt', {session: false}), (req, res, next) => {

//         // User.getUserById(req.params.id, (err, user) => { 
//         //     if (err) throw err; 
            
//         //     console.log('USER: ');
//         //     console.log(user.isAdmin); 
//         //     console.log('ID: ');
//         //     console.log(req.params.id);
//         //     console.log('PASSPORT ID: ');
//         //     // console.log(passport.);
           

//         // });

//     User.changePassword(req.params.id, req.body.password, (err, result) => {
//         if (err) throw err;
//         res.send('Password updated.');
//     });
// });
 
// //delete user
// router.delete('/:id/delete', passport.authenticate('jwt', {session: false}), (req, res, next) => {
//     User.deleteUser(req.params.id, (err, result) => {
//         if (err) throw err;
//         res.send('User deleted.');
//     })
// });

module.exports = router;