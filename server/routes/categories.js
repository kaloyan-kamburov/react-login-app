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

//upload middlewares
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
            let ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
            req.body.avatar = req.body.name + '.'+ ext;
            callback(null, req.body.name + '.'+ ext);
        }
    })
});

//Get all categories
router.get('/', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const categories = await Category.getAll();

        if (categories.length) {
            return res.json({
                success: true,
                categories
            })
        } else {            
            return res.json({
                success: false,
                msg: 'No categories found'
            })
        }
    } catch(error) {       
        return res.json({
            success: false,
            error
        })

    }
});

//get single category

router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const category = await Category.getCategoryById(req.params.id)
        if (category) {
            fs.readFile(path.resolve(__dirname, '..' + config.imagesFolder + '/categories/' + category.avatar), 'base64', (error, file) => {
                let img = file ? 'data:image/jpeg;base64,' + file.toString('base64') : null;
                return res.json({
                    success: true,
                    category: {
                        id: category._id,
                        name: category.name,
                        desc: category.desc,
                        avatar: category.avatar,
                        avatarFile: img
                    }
                });
            });
        } else {
            return res.json({
                success: false,
                msg: 'Category not found'
            });
        }
    } catch(error) {
        return res.json({
            success: false, 
            msg: 'Error getting category', 
            error
        })
    }
});

//Add category
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
                errorType: ['name']
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