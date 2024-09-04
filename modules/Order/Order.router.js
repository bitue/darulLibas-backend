const express = require('express');
const {
    makeOrder,
    getAllOrders,
    changeOrderStatus,
    deleteOrderById,
    getAllSuccessfulOrders
} = require('./Order.controller');
const orderRouter = express.Router();

orderRouter.post('/makeOrder', makeOrder);
orderRouter.get('/getAllOrders', getAllOrders);
orderRouter.put('/changeOrderStatus', changeOrderStatus);
orderRouter.delete('/deleteOrderById', deleteOrderById);
orderRouter.get('/getAllSuccessfulOrder', getAllSuccessfulOrders);
//orderRouter.delete('/deleteOrderById', )

module.exports = {
    orderRouter
};
