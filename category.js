const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

categorySchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Category = mongoose.model('Category', categorySchema);

const createCategory = async (data) => {
    const category = new Category(data);
    return await category.save();
};

const getCategories = async () => {
    return await Category.find({ isDeleted: false });
};

const getCategoryById = async (id) => {
    return await Category.findById(id);
};

const updateCategory = async (id, data) => {
    return await Category.findByIdAndUpdate(id, data, { new: true });
};

const deleteCategory = async (id) => {
    return await Category.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};