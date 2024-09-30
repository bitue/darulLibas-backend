const app = require('express');
const {
    createAdmin,
    deleteAdmin,
    getAllAdmin,
    changePasswordAdmin
} = require('./Admin.controller');
const {
    createCategory,
    deleteCategory,
    getCategories
} = require('../Category/Category.controller');
const { addProduct, deleteProduct } = require('../Product/Product.controller');
const { changeOrderStatus, getAllOrders, getOrderById } = require('../Order/Order.controller');
const { getCustomerInfo } = require('../Customer/customer.controller');
const adminRouter = app.Router();

adminRouter.post('/createAdmin', createAdmin); // checkRole
adminRouter.delete('/deleteAdmin', deleteAdmin); // checkRole
adminRouter.get('/getAllAdmin', getAllAdmin); // checkROle
adminRouter.post('/changePasswordAdmin', changePasswordAdmin);

adminRouter.post('/addCategory', createCategory);
adminRouter.delete('/deleteCategory', deleteCategory);
adminRouter.get('/getCategories', getCategories);

adminRouter.post('/addProduct', addProduct);
adminRouter.delete('/deleteProduct', deleteProduct);

adminRouter.post('/changeOrderStatus', changeOrderStatus);
adminRouter.get('/getAllOrders', getAllOrders);
adminRouter.get('/getOrderById', getOrderById);

adminRouter.get('/getCustomers', getCustomerInfo); 

module.exports = {
    adminRouter
};
