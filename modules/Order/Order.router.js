const express = require('express');
const { makeOrder, getAllOrders } = require('./Order.controller');
const orderRouter = express.Router();

orderRouter.post('/makeOrder', makeOrder);
orderRouter.get('/getAllOrders', getAllOrders);

module.exports = {
    orderRouter
};
