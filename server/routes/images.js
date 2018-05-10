const express = require('express');
const router = express.Router();
const fs = require('fs');
const imagesFolder = './images/'

router.get('/:path([^/]+/[^/]+)', function(req, res, next) {
    fs.readFile(imagesFolder + req.params.path, (err, file) => {
        if (err) throw err;
        
        res.end(file);
    })
});

module.exports = router;