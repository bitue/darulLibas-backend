// external module imports
const express = require('express');
const app = express();
const cors = require('cors'); // cors

const { authRouter } = require('./modules/Auth/routes/auth.route');
const { adminRouter } = require('./modules/Admin/Admin.route');
const { orderRouter } = require('./modules/Order/Order.router');
const { publicRouter } = require('./modules/Public/Public.router');
const { checkToken } = require('./middlewares/checkToken');
const { queryRouter } = require('./modules/Query/Query.router');

require('dotenv').config(); // req for access dot env file

// application level middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// case sensitive routing
app.enable('case sensitive routing');

// public routes
// home route
app.get('/', (req, res) => {
    res.send('home route');
});

// public route
app.use('/public', publicRouter);

// // auth routers
app.use('/auth', authRouter);

// admin routers
app.use('/admin', checkToken, adminRouter);

// order routers
app.use('/order', orderRouter);

// query routers
app.use('/query', queryRouter);

// not found any route error : 404
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    console.log('no route found');
    res.send(error);
});

// final error handling  middleware error : 500

app.use((error, req, res, next) => {
    console.log('last middleware');
    res.status(error.status || 500).json({
        error: true,
        message: error.message
    });
});

module.exports = app;
