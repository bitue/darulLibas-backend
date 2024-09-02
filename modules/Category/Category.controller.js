const { Product } = require('../Product/Product.model');
const { Category } = require('./Category.model');

const createCategory = async (req, res, next) => {
    try {
        const { name, description, img, reviews } = req.body;
        const createCategory = await Category.create({ name, description, img, reviews });
        res.send({ status: 'Category created successfully .....', category: createCategory });
    } catch (err) {
        console.log(err.message);
        next(err.message);
    }
};

const getCategories = async (req, res, next) => {
    try {
        const getAllCategories = await Category.find({});
        res.send({ status: 'Category created successfully .....', categories: getAllCategories });
    } catch (err) {
        console.log(err.message);
        next(err.message);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.body;
        const deleteCategoryRes = await Category.findByIdAndDelete({ _id: id });
        // want to delete call product which is in this category
        const deleteProductAll = await Product.deleteMany({ category: id });
        res.send({
            status: 'Category and associated product deleted successfully .....',
            res: deleteCategoryRes,
            deleteAllProductRes: deleteProductAll
        });
    } catch (err) {
        console.log(err.message);
        next(err.message);
    }
};

module.exports = {
    createCategory,
    deleteCategory,
    getCategories
};
