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

const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.body;
        const deleteCategoryRes = await Category.findByIdAndDelete({ _id: id });
        res.send({ status: 'Category deleted successfully .....', res: deleteCategoryRes });
    } catch (err) {
        console.log(err.message);
        next(err.message);
    }
};

module.exports = {
    createCategory,
    deleteCategory
};
