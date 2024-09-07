const express = require('express');
const { getQuery, addQuery, updateQuery, closeQuery } = require('./Query.controller');
const { checkToken } = require('../../middlewares/checkToken');

const queryRouter = express.Router();

queryRouter.get('/getAllQueries', checkToken, getQuery);
queryRouter.post('/addQuery', addQuery);
queryRouter.delete('/closeQuery', checkToken, closeQuery);

module.exports = {
    queryRouter
};
