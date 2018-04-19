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

const uploadCreateCategory = multer({
    fileFilter: async (req, file, callback) => {
        const category = await Category.getCategoryByName(req.body.name)
        if(category) {
           return callback(null, false)
        }
        return callback(null, true)
    },
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, 'images/categories/')
        },
        filename: (req, file, callback) => {
            console.log(req)
            console.log(file)
            let ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
            req.body.avatar = req.body.name + '.'+ ext;
            callback(null, req.body.name + '.'+ ext);
        }
    })
})

// const uploadRegister = multer({
//     fileFilter: async (req, file, callback) => {
//         const user = await Category.getUser(req.body.username, req.body.email);
//         if(user) {
//            return callback(null, false)
//         }
//         return callback(null, true)
//     },
//     storage: multer.diskStorage({
//         destination: (req, file, callback) => {
//             callback(null, 'images/users/')
//         },
//         filename: (req, file, callback) => {
//             console.log(req.body)
//             let ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
//             req.body.avatar = req.body.username + '.'+ ext;
//             callback(null, req.body.username + '.'+ ext);
//         }
//     })
// })

//Register
router.post('/add',  uploadCreateCategory.single('avatar'), async (req, res, next) => {
    try {
        const newCategory = new Category({
            name: req.body.name,
            desc: req.body.desc,
            avatar: req.body.avatar
        })

        const category = await Category.getCategoryByName(req.body.name);

        if (!category) {
            const categoryAdd = await Category.addCategory(newCategory);

            if (categoryAdd) {
                return res.json({
                    success: true, 
                    msg: 'Category created',
                    category: categoryAdd
                });
            } else {
                return res.json({
                    success: false, 
                    msg: 'Category was not created'
                });
            }
        } else {
            return res.json({
                success: false, 
                msg: 'Category exists',
            });
        }

    } catch(error) {
        console.log(error)
        
        return res.json({
            success: false, 
            msg: '', 
            error: error
        });
    }
    
});

module.exports = router;