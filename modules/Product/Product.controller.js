// const addProduct = async(req, res, next) => {
//     try {

//     } catch (err) {
//         console.log(err.message);
//         next(err.message);
//     }

// }

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
        res.send({ status: 'Product Added Successful', product: addProduct });
    } catch (err) {
        console.log(err.message);
        next(err.message);
    }
};

const getAllProducts = async (req, res, next) => {
    try {
        const getAllProducts = await Product.find({}).populate('category');
        console.log(getAllProducts);
        res.send({ status: 'Category deleted successfully .....', products: getAllProducts });
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
