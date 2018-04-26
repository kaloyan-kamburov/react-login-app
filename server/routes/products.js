const express = require('express');
const router = express.Router();

const Product = require('../models/product');

//Add category
router.post('/add', async (req, res, next) => {
    try {
        console.log(req.body)
        // const newCategory = new Category({
        //     name: req.body.name,
        //     desc: req.body.desc,
        //     avatar: req.body.avatar
        // })

        // const category = await Category.getCategoryByName(req.body.name);

        // if (!category) {
        //     const categoryAdd = await Category.addCategory(newCategory);

        //     if (categoryAdd) {
        //         return res.json({
        //             success: true, 
        //             msg: 'Category created',
        //             category: categoryAdd
        //         });
        //     } else {
        //         return res.json({
        //             success: false, 
        //             msg: 'Category was not created'
        //         });
        //     }
        // } else {
        //     return res.json({
        //         success: false, 
        //         msg: 'Category exists',
        //         errorType: ['name']
        //     });
        // }

    } catch(error) {
        console.log(error)
        
        return res.json({
            success: false, 
            msg: '', 
            error: error
        });
    }
    
});

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