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

        // Find the category by ID to get the associated products
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).send({
                status: 'Category not found'
            });
        }

        // Delete all products associated with this category
        const deleteProductAll = await Product.deleteMany({
            _id: { $in: category.products }
        });

        // Delete the category itself
        const deleteCategoryRes = await Category.findByIdAndDelete(id);

        res.send({
            status: 'Category and associated products deleted successfully',
            category: deleteCategoryRes,
            deletedProducts: deleteProductAll
        });
        // const { id } = req.body;
        // const deleteCategoryRes = await Category.findByIdAndDelete({ _id: id });

        // res.send({
        //     status: 'Category and associated product deleted successfully .....',
        //     res: deleteCategoryRes,
        //     deleteAllProductRes: deleteProductAll
        // });
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
