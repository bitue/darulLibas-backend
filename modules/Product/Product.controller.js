const { Category } = require('../Category/Category.model');
const { Product } = require('./Product.model');

const addProduct = async (req, res, next) => {
    try {
        const {
            productName,
            productPrice,
            productImgList,
            productStatus,
            productBrand,
            category,
            description,
            amountOfSell,
            star,
            size,
            reviews,
            features
        } = req.body;

        console.log(req.tokenPayLoad, 11);

        const addProduct = await Product.create({
            productName,
            productPrice,
            productImgList,
            productStatus,
            productBrand,
            category,
            description,
            amountOfSell,
            star,
            size,
            reviews,
            features
        });
        // add it to the category schema
        await Category.updateOne(
            { _id: category }, // Query to find the order
            { $push: { products: addProduct._id } } // Update to push the productId into the products array
        );

        res.send({ status: 'Product Added Successful', product: addProduct });
    } catch (err) {
        console.log(err.message);
        next(err.message);
    }
};

const getAllProducts = async (req, res, next) => {
    try {
        const getAllProducts = await Category.find({}).populate('products');

        console.log(getAllProducts);
        res.send({ status: 'OK', products: getAllProducts });
    } catch (err) {
        console.log(err.message);
        next(err.message);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.body;
        const deleteProductRes = await Product.findByIdAndDelete({ _id: id });
        res.send({ status: 'Category deleted successfully .....', res: deleteProductRes });
    } catch (err) {
        console.log(err.message);
        next(err.message);
    }
};

const getProductById = async (req, res, next) => {
    try {
        const { id } = req.body;
        const getProduct = await Product.findById({ _id: id });
        res.send({ status: 'Category deleted successfully .....', res: getProduct });
    } catch (err) {
        console.log(err.message);
        next(err.message);
    }
};

module.exports = {
    addProduct,
    deleteProduct,
    getAllProducts,
    getProductById
};
