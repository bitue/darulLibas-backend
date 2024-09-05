// external module imports
const express = require('express');
const app = express();
const cors = require('cors'); // cors

const { authRouter } = require('./modules/Auth/routes/auth.route');
const { adminRouter } = require('./modules/Admin/Admin.route');
const { orderRouter } = require('./modules/Order/Order.router');
const { publicRouter } = require('./modules/Public/Public.router');
const { checkToken } = require('./middlewares/checkToken');

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

// not found any route error : 404
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    console.log('no route found');
    res.send(error);
});

// final error handling  middl eware error : 500

app.use((err, req, res, next) => {
    console.log('last middleware');
    res.status(err.status || 500).send(err.message);
});

module.exports = app;
