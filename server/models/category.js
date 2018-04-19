const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
});


const Category = module.exports = mongoose.model('Category', CategorySchema);

module.exports.addCategory = async function(newCategory) { 
    return newCategory.save();
}

module.exports.getCategoryByName = async function(name) { 
    const query = {name: name};
    return Category.findOne(query);
}