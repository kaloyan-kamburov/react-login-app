const express = require('express');
const router = express.Router();

const Product = require('../models/product');

// router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
//     try {
//         const product = await Product.getProductById(req.params.id)
//         if (product) {
//             fs.readFile(path.resolve(__dirname, '..' + config.imagesFolder + '/categories/' + category.avatar), 'base64', (error, file) => {
//                 let img = file ? 'data:image/jpeg;base64,' + file.toString('base64') : null;
//                 return res.json({
//                     success: true,
//                     category: {
//                         id: category._id,
//                         name: category.name,
//                         desc: category.desc,
//                         avatar: category.avatar,
//                         avatarFile: img
//                     }
//                 });
//             });
//         } else {
//             return res.json({
//                 success: false,
//                 msg: 'Category not found'
//             });
//         }
//     } catch(error) {
//         return res.json({
//             success: false, 
//             msg: 'Error getting category', 
//             error
//         })
//     }
// });

module.exports = router;