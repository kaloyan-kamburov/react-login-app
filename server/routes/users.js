const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const fs = require('fs');
const User = require('../models/user');
const path = require('path');
const multer = require('multer')
const upload = multer({dest: 'images/'})
require('dotenv').config();
const secret = process.env.SECRET;

const createToken = require('../utils/token');

//Register
router.post('/register', upload.single('avatar'), async (req, res, next) => { 
    const newUser = new User({
        username: req.body.username,
        avatar: req.body.avatar,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
    }); 
    console.log(req.file)

    try {
        const user = await User.getUser(req.body.username, req.body.email);
        if (!user) {
            const userAdd = await User.addUser(newUser)
            if (userAdd) {
                const token = createToken(userAdd);


                //fs.copySync(path.resolve(__dirname,'./mainisp.jpg'), './test/mainisp.jpg');

                fs.writeFile('../images', req.file, 'binary', function(e) {
                    if(e) {
                        console.log(e)
                        res.end(200)
                    } else {
                       
                        return res.end(200)
                    }
                })
                // fs.copy('C:\\Users\\C19113A\\Desktop\\(5.0) BI', './images/newfile').then(() => console.log('success!'))
                // .catch(err => console.error(err))

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

//Get user
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