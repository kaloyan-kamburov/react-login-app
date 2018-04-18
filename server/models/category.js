const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
});


const Category = module.exports = mongoose.model('Category', CategorySchema);

module.exports.addCategory = async function(newCategory) { 
    return newCategory.save();
}