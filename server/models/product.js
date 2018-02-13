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
    promoCodes: {
        type: Array,
        required: false
    }
});

const Product = module.exports = mongoose.model('Product', ProductSchema);

module.exports.getProductById = function(id, callback) {
    Product.findById(id, callback); 
}

module.exports.getAllProducts = function(callback) {
    Product.find({}, callback);
}

module.exports.addProduct = function(newProduct, callback) {
    Product.save(callback);
}

module.exports.deleteProduct = function(id, callback) {
    Product.findByIdAndRemove(id, callback);
}

module.exports.updateProduct = function(id, body, callback) { 
    Product.findByIdAndUpdate(id, body, callback);
}
