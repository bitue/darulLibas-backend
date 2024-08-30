const app = require('express');
const { createAdmin, deleteAdmin } = require('./Admin.controller');
const { createCategory, deleteCategory } = require('../Category/Category.controller');
const { addProduct, deleteProduct } = require('../Product/Product.controller');
const { changeOrderStatus, getAllOrders, getOrderById } = require('../Order/Order.controller');
const { getCustomerInfo } = require('../Customer/customer.controller');
const adminRouter = app.Router();

adminRouter.post('/createAdmin', createAdmin);
adminRouter.delete('/deleteAdmin', deleteAdmin);

adminRouter.post('/createCategory', createCategory);
adminRouter.delete('/deleteCategory', deleteCategory);

adminRouter.post('/addProduct', addProduct);
adminRouter.delete('/deleteProduct', deleteProduct);

adminRouter.post('/changeOrderStatus', changeOrderStatus);
adminRouter.get('/getAllOrders', getAllOrders);
adminRouter.get('/getOrderById', getOrderById);

adminRouter.get('/getCustomers', getCustomerInfo);

module.exports = {
    adminRouter
};
