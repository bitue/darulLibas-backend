const { Category } = require('../Category/Category.model');
const { Order } = require('../Order/Order.model');
const { Shopping } = require('../Shopping/Shopping.model');
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
        // pull the product id from the category
        // const removeId = await Category.findByIdAndUpdate(
        //     { _id: id },
        //     { $pull: { products: id } }, // Removes the product ID from the products array
        //     { new: true } // Returns the updated document
        // );

        // here need to check the product whether is associated with orders
        const associatedProduct = await Shopping.find({ productId: id });
        console.log(
            associatedProduct,
            'orders associated with this product ',
            associatedProduct.length
        );

        if (associatedProduct.length) {
            res.send({
                message: 'This product is associated with shopping carts'
            });
        } else {
            const updatedCategory = await Category.updateMany(
                { products: id },
                { $pull: { products: id } }
            );

            const deleteProductRes = await Product.findByIdAndDelete({ _id: id });
            res.send({
                status: 'Category deleted successfully .....',
                res: deleteProductRes,
                categoryUpdate: updatedCategory
            });
        }
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
