const express = require('express');
const router = express.Router();
const passport = require('passport');
const Category = require('../models/category');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const fs = require('fs');
const User = require('../models/user');
const path = require('path');
const multer = require('multer');
require('dotenv').config();
const secret = process.env.SECRET;


/*const uploadCreateCategory = multer({
    fileFilter: async (req, file, callback) => {
        // const user = await User.getUser(req.body.username, req.body.email);
        // if(user) {
        //    return callback(null, false)
        // }
        return callback(null, true)
    },
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, 'images/categories/')
        },
        filename: (req, file, callback) => {
            let ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
            req.body.avatar = req.body.name + '.'+ ext;
            callback(null, req.body.name + '.'+ ext);
        }
    })
})*/

const uploadCreateCategory = multer({
    fileFilter: async (req, file, callback) => {
        // const user = await User.getUser(req.body.username, req.body.email);
        // if(user) {
        //    return callback(null, false)
        // }
        return callback(null, true)
    },
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, 'images/categories/')
        },
        filename: (req, file, callback) => {
            let ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
            req.body.avatar = req.body.name + '.'+ ext;
            callback(null, req.body.name + '.'+ ext);
        }
    })
})

//Register
router.post('/add',  uploadCreateCategory.single('avatar'), async (req, res, next) => {
    // const newUser = new User({
    //     username: req.body.username,
    //     avatar: req.body.avatar,
    //     firstname: req.body.firstname,
    //     lastname: req.body.lastname,
    //     address: req.body.address,
    //     phone: req.body.phone,
    //     email: req.body.email,
    //     password: req.body.password,
    //     roles: ["user"]
    // }); 

    try {
        console.log(req.body)
        // const user = await User.getUser(req.body.username, req.body.email);
        // if (!user) {
        //     const userAdd = await User.addUser(newUser)
        //     if (userAdd) {
        //         const token = createToken(userAdd);

        //         let img = 'data:image/jpeg;base64,' + fs.readFileSync(path.resolve(__dirname, '..' + config.imagesFolder + '/users/' + userAdd.avatar), 'base64', (error, file) => {});
                    
        //         // console.log(userAdd)

        //         return res.json({
        //             success: true, 
        //             msg: 'User registered',
        //             user: {
        //                 id: userAdd._id,
        //                 username: userAdd.username,
        //                 firstname: userAdd.firstname,
        //                 lastname: userAdd.lastname,
        //                 address: userAdd.address,
        //                 phone: userAdd.phone, 
        //                 email: userAdd.email, 
        //                 avatar: userAdd.avatar,
        //                 avatarFile: img
        //             },
        //             token
        //         });
        //     }
        // } else {
        //     let errorType,
        //     msgText = () => {
        //         if (user.username === req.body.username && user.email === req.body.email) {
        //             errorType = ['username', 'email']
        //             return 'Username and email exists';
        //         }
        //         if (user.username === req.body.username) {
        //             errorType = ['username'];
        //             return 'Username exists';
        //         }
        //         if (user.email === req.body.email) {
        //             errorType = ['email'];
        //             return 'Email exists';
        //         }
        //     }
        //     return res.json({ 
        //         success: false, 
        //         msg: msgText(),
        //         errorType,
        //         user: {}
        //     });
        // }
    } catch (error) {
        // res.json({success: false, msg: '', error: error})
    }
});

module.exports = router;