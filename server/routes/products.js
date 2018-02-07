const express = require('express');
const router = express.Router();

const Product = require('../models/product');

router.get('/:id', (req, res, next) => {
    Product.getProductById(req.params.id, (err, product) => { 
        if (err) throw err;
        res.json(product);
    });
});

module.exports = router;