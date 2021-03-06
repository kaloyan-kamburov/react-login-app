const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
require('dotenv').config();
const secret = process.env.SECRET;
const Product = require('../models/product');

//upload middlewares
const uploadProduct = multer({
    fileFilter: async (req, file, callback) => {
        const product = await Product.getProductByName(req.body.name);
        // console.log(product)
        if (!product || (product && req.body.id == product._id) ) {
            return callback(null, true);
        }
        return callback(null, false);

    },
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, 'images/products/');
        },
        filename: (req, file, callback) => {
            let ext = file.originalname.split('.')[file.originalname.split('.').length - 1];
            req.body.avatar = req.body.name + '.'+ ext;
            callback(null, req.body.name + '.'+ ext);
        }
    })
});

//Add product
router.post('/add', uploadProduct.single('productImage'), passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price,
            categories: req.body.categories.split(','),
            description: req.body.description,
            avatar: req.body.avatar
        });

        const product = await Product.getProductByName(req.body.name);

        if (!product) {
            const productAdd = await Product.addProduct(newProduct);

            if (productAdd) {
                return res.json({
                    success: true, 
                    msg: 'Product created',
                    product: productAdd
                });
            } else {
                return res.json({
                    success: false, 
                    msg: 'Product was not created'
                });
            }
        } else {
            return res.json({
                success: false, 
                msg: 'Product exists',
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

//Get all products
router.get('/', async (req, res, next) => {
    try {
        const products = await Product.getAll();

        if (products.length) {
            return res.json({
                success: true,
                products
            })
        } else {            
            return res.json({
                success: false,
                msg: 'No products found'
            })
        }
    } catch(error) {       
        return res.json({
            success: false,
            error
        })

    }
});

router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const product = await Product.getProductById(req.params.id)
        if (product) {
            fs.readFile(path.resolve(__dirname, '..' + config.imagesFolder + '/products/' + product.avatar), 'base64', (error, file) => {
                let img = file ? 'data:image/jpeg;base64,' + file.toString('base64') : null;
                return res.json({
                    success: true,
                    product: {
                        id: product._id,
                        name: product.name,
                        categories: product.categories,
                        price: product.price,
                        description: product.description,
                        avatar: product.avatar,
                        avatarFile: img
                    }
                });
            });
        } else {
            return res.json({
                success: false,
                msg: 'Product not found'
            });
        }
    } catch(error) {
        console.log(error)
        return res.json({
            success: false, 
            msg: 'Error getting product', 
            error
        })
    }
});

router.put('/update/:id', passport.authenticate('jwt', {session: false}), uploadProduct.single('avatar'), async (req, res, next) => {
    try { 
        const productByName = await Product.getProductByName(req.body.name); 
        
        if (!productByName || (productByName && req.body.id == productByName._id) ) { 
            console.log(req.body.categories)
            const product = await Product.updateProduct(req.body.id, {
                $set: {
                    ...req.body,
                    categories: req.body.categories.split(',')
                }
            })

            if (product) {
                let img = 'data:image/jpeg;base64,' + fs.readFileSync(path.resolve(__dirname, '..' + config.imagesFolder + '/products/' + product.avatar), 'base64', (error, file) => {});

                return res.json({
                    success: true,
                    product: {
                        id: product._id,
                        name: product._doc.name,
                        price: product._doc.price,
                        description: product._doc.description,
                        categories: product._doc.categories,
                        avatar: product._doc.avatar,
                        avatarFile: img,
                    },
                    errorType: [],
                    msg: 'Product updated'
                });                
                
            } else {
                return res.json({
                    success: false,
                    msg: 'Product not found'
                });
            } 
        }
        return res.json({
            success: false,
            msg: 'Product exists',
            errorType: ['name']
        });
    } catch(error) {
        console.log(error)
        return res.json({
            success: false,
            error,
            msg: 'Error while updating product'
        })
    }    
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const productDelete = await Product.deleteProduct(req.params.id); 
        
        if (productDelete) {
            return res.json({
                success: true,
                msg: 'Product deleted',
                product: productDelete
            })
        } else {
            return res.json({
                success: false,
                msg: 'Product not found'
            })
        }

    } catch(error) {
        return res.json({
            succes: false, 
            error,
            msg: 'Error while deleting product'
        })
    }
})

module.exports = router;