const express = require('express');
const { getCategories } = require('../Category/Category.controller');
const { getAllProducts, getProductById } = require('../Product/Product.controller');

const publicRouter = express.Router();

//public routes

publicRouter.get('/getAllCategories', getCategories);
publicRouter.get('/getAllProducts', getAllProducts);
publicRouter.get('/getProductById', getProductById); // not used
module.exports = {
    publicRouter
};
