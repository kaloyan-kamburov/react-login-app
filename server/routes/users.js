const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const fs = require('fs');
const User = require('../models/user');
const path = require('path');
const multer = require('multer');
require('dotenv').config();
const secret = process.env.SECRET;

const createToken = require('../utils/token');

const uploadRegister = multer({
    fileFilter: async (req, file, callback) => {
        const user = await User.getUser(req.body.username, req.body.email);
        if(user) {
           return callback(null, false)
        }
        return callback(null, true)
    },
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, 'images/')
        },
        filename: (req, file, callback) => {
            let ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
            req.body.avatar = req.body.username + '.'+ ext;
            callback(null, req.body.username + '.'+ ext);
        }
    })
})

const uploadProfile = multer({
    fileFilter: async (req, file, callback) => {
        const userByEmail = await User.getUserByEmail(req.body.email); 
      
        if(userByEmail && userByEmail._id == req.params.id) {
           return callback(null, true)
        }
        return callback(null, false)
    },
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, 'images/')
        },
        filename: (req, file, callback) => {
            let ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
            req.body.avatar = req.body.username + '.'+ ext;
            callback(null, req.body.username + '.'+ ext);
        }
    })
})

//Register
router.post('/register', uploadRegister.single('avatar'), async (req, res, next) => {
    const newUser = new User({
        username: req.body.username,
        avatar: req.body.avatar,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
    }); 

    console.log(req.body)

    try {
        const user = await User.getUser(req.body.username, req.body.email);
        if (!user) {
            const userAdd = await User.addUser(newUser)
            if (userAdd) {
                const token = createToken(userAdd);

                let img = 'data:image/jpeg;base64,' + fs.readFileSync(path.resolve(__dirname, '..' + config.imagesFolder + userAdd.avatar), 'base64', (error, file) => {});
                    

                return res.json({
                    success: true, 
                    msg: 'User registered',
                    user: {
                        username: userAdd.username,
                        firstname: userAdd.firstname,
                        lastname: userAdd.lastname,
                        address: userAdd.address,
                        phone: userAdd.phone, 
                        email: userAdd.email, 
                        avatar: userAdd.avatar,
                        avatarFile: img
                    },
                    token
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
        res.json({success: false, msg: '', err: err})
    }
});

//Authenticate
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
                    let img = 'data:image/jpeg;base64,' + fs.readFileSync(path.resolve(__dirname, '..' + config.imagesFolder + user.avatar), 'base64', (error, file) => {});
                    
                    return res.json({
                        success: true,                        
                        user: {
                            id: user._id,
                            username: user.username,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            address: user.address,
                            phone: user.phone, 
                            email: user.email, 
                            avatar: user.avatar,
                            avatarFile: img
                        },
                        token
                    });
                }
                return res.json({
                    success: false,
                    msg: 'Incorrect login credentials'
                });
            } catch (error) {
                return res.json({success: false, msg: '', error: error})
            }           
        }        
    } catch(error) {
        return res.json({success: false, msg: '', error: error})
    }
});

//Get user
router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const user = await User.getUserById(req.params.id)
        if (user) {
            fs.readFile(path.resolve(__dirname, '..' + config.imagesFolder + user.avatar), 'base64', (error, file) => {
                
                let img = file ? 'data:image/jpeg;base64,' + file.toString('base64') : null;
                return res.json({
                    success: true,
                    user: {
                        id: user._id,
                        username: user.username,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        address: user.address,
                        phone: user.phone, 
                        email: user.email, 
                        avatar: user.avatar,
                        avatarFile: img
                    }
                })
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
router.put('/update/:id', passport.authenticate('jwt', {session: false}), uploadProfile.single('avatar'), async (req, res, next) => {
    
    try {
        const userByEmail = await User.getUserByEmail(req.body.email); 

        if (userByEmail && userByEmail._id == req.params.id || !userByEmail) { 
            const user = await User.updateUser(req.params.id, {$set: req.body});
            if (user) {
                let img = 'data:image/jpeg;base64,' + fs.readFileSync(path.resolve(__dirname, '..' + config.imagesFolder + user._doc.avatar), 'base64', (error, file) => {});
                
                return res.json({
                    success: true,
                    user: {
                        id: user._id,
                        username: user._doc.username,
                        firstname: user._doc.firstname,
                        lastname: user._doc.lastname,
                        address: user._doc.address,
                        phone: user._doc.phone, 
                        email: user._doc.email, 
                        avatar: user._doc.avatar,
                        avatarFile: img
                    },
                    msg: 'User updated'
                });
                

                // return res.json({
                //     success: true,                
                //     user: {
                //         id: user._id,
                //         username: user.firstname,
                //         firstname: user.firstname,
                //         lastname: user.lastname,
                //         address: user.address,
                //         phone: user.phone, 
                //         email: user.email, 
                //         avatar: user.avatar, 
                //         avatarBase64: img
                //     },
                //     msg: 'User updated'
                // });

                
                
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
        console.log(error)
        return res.json({
            success: false,
            error: error,
            msg: 'Error while updating user'
        })
    }    
});

//Change password
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
                                success: true,
                                msg: 'Password changed'
                            });
                        } else {
                            return res.json({
                                success: false,
                                msg: 'Password didn\'t changed'
                            });
                        }
                    } catch (error) {
                        return res.json({
                            success: false,
                            msg: 'Password didn\'t updated'
                        });
                    }
                } else {
                    return res.json({
                        success: false,
                        msg: 'Old password doesn\'t match'
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

 
// //delete user
// router.delete('/:id/delete', passport.authenticate('jwt', {session: false}), (req, res, next) => {
//     User.deleteUser(req.params.id, (err, result) => {
//         if (err) throw err;
//         res.send('User deleted.');
//     })
// });

module.exports = router;