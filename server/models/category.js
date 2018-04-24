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


module.exports.getAll = async function() {
    return Category.find({});
}

module.exports.getCategoryById = async function(id) {
    return Category.findById(id); 
}

module.exports.addCategory = async function(newCategory) { 
    return newCategory.save();
}

module.exports.getCategoryByName = async function(name) { 
    const query = {name: name};
    return Category.findOne(query);
}

module.exports.updateCategory = async function(id, body) { 
    return Category.findByIdAndUpdate(id, body, {new: true});
}

module.exports.deleteCategory = async function(id) {
    return Category.findByIdAndRemove(id);
}