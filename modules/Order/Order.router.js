const express = require('express');
const { makeOrder } = require('./Order.controller');
const orderRouter = express.Router();

orderRouter.post('/makeOrder', makeOrder);

module.exports = {
    orderRouter
};
