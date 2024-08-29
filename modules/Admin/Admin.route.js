const app = require('express');
const { createAdmin, deleteAdmin } = require('./Admin.controller');
const { createCategory, deleteCategory } = require('../Category/Category.controller');
const { addProduct, deleteProduct } = require('../Product/Product.controller');
const adminRouter = app.Router();

adminRouter.post('/createAdmin', createAdmin);
adminRouter.delete('/deleteAdmin', deleteAdmin);

adminRouter.post('/createCategory', createCategory);
adminRouter.delete('/deleteCategory', deleteCategory);

adminRouter.post('/addProduct', addProduct);
adminRouter.delete('/deleteProduct', deleteProduct);

module.exports = {
    adminRouter
};
