const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    // variations: {
    //     type: Array,
    //     required: true,
    // },
    // promoCodes: {
    //     type: Array,
    //     required: false
    // }
});

const Product = module.exports = mongoose.model('Product', ProductSchema);

module.exports.getAll = async function() {
    return Product.find({});
}

module.exports.getProductById = async function(id) {
    return Product.findById(id); 
}

module.exports.addProduct = async function(newProduct) { 
    return newProduct.save();
}

module.exports.getProductByName = async function(name) { 
    const query = {name: name}; 
    return Product.findOne(query);
}

module.exports.addProduct = async function(newProduct) { 
    return newProduct.save();
}


// module.exports.getProductById = function(id, callback) {
//     Product.findById(id, callback); 
// }

// module.exports.getAllProducts = function(callback) {
//     Product.find({}, callback);
// }

// module.exports.addProduct = function(newProduct, callback) {
//     Product.save(callback);
// }

// module.exports.deleteProduct = function(id, callback) {
//     Product.findByIdAndRemove(id, callback);
// }

// module.exports.updateProduct = function(id, body, callback) { 
//     Product.findByIdAndUpdate(id, body, callback);
// }

// module.exports.addProduct = async function(newProduct) {
//     return newProduct.save();
// }


