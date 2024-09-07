const express = require('express');
const {
    makeOrder,
    getAllOrders,
    changeOrderStatus,
    deleteOrderById,
    getAllSuccessfulOrders
} = require('./Order.controller');
const { checkToken } = require('../../middlewares/checkToken');
const orderRouter = express.Router();

orderRouter.post('/makeOrder', makeOrder);
orderRouter.get('/getAllOrders', checkToken, getAllOrders);
orderRouter.put('/changeOrderStatus', checkToken, changeOrderStatus);
orderRouter.delete('/deleteOrderById', checkToken, deleteOrderById);
orderRouter.get('/getAllSuccessfulOrder', checkToken, getAllSuccessfulOrders);
//orderRouter.delete('/deleteOrderById', )

module.exports = {
    orderRouter
};
