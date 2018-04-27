const express = require('express');
const router = express.Router();
const passport = require('passport');
const Category = require('../models/category');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
require('dotenv').config();
const secret = process.env.SECRET;

//upload middlewares
const uploadCategory = multer({
    fileFilter: async (req, file, callback) => {
        const category = await Category.getCategoryByName(req.body.name);
        if (!category || (category && req.body.id == category._id) ) {
            return callback(null, true)
        }
        return callback(null, false);
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

//Add category
router.post('/add', passport.authenticate('jwt', {session: false}), uploadCategory.single('avatar'), async (req, res, next) => {
    try {
        const newCategory = new Category({
            name: req.body.name,
            description: req.body.description,
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
        return res.json({
            success: false, 
            msg: '', 
            error: error
        });
    }
    
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

router.put('/update/:id', passport.authenticate('jwt', {session: false}), uploadCategory.single('avatar'), async (req, res, next) => {
    try {
        const categoryByName = await Category.getCategoryByName(req.body.name); 

        console.log(categoryByName)
        
        if (!categoryByName || (categoryByName && req.body.id == categoryByName._id) ) { 
            const category = await Category.updateCategory(req.body.id, {$set: req.body})

            if (category) {
                let img = 'data:image/jpeg;base64,' + fs.readFileSync(path.resolve(__dirname, '..' + config.imagesFolder + '/categories/' + category.avatar), 'base64', (error, file) => {});

                return res.json({
                    success: true,
                    category: {
                        _id: category._id,
                        name: category._doc.name,
                        desc: category._doc.desc,
                        avatar: category._doc.avatar,
                        avatarFile: img
                    },
                    msg: 'Category updated'
                });                
                
            } else {
                return res.json({
                    success: false,
                    msg: 'Category not found'
                });
            } 
        }
        return res.json({
            success: false,
            msg: 'Category exists',
            errorType: ['name']
        });
    } catch(error) {
        console.log(error)
        return res.json({
            success: false,
            error,
            msg: 'Error while updating category'
        })
    }    
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const categoryDelete = await Category.deleteCategory(req.params.id); 
        
        if (categoryDelete) {
            return res.json({
                success: true,
                msg: 'Category deleted',
                category: categoryDelete
            })
        } else {
            return res.json({
                success: false,
                msg: 'Category not found'
            })
        }

    } catch(error) {
        return res.json({
            succes: false, 
            error,
            msg: 'Error while deleting category'
        })
    }
})



module.exports = router;