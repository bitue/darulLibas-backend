const express = require('express');
const { signIn, changePassword } = require('../Controllers/Auth.controller');


const authRouter = express.Router();

authRouter.post('/signIn', signIn);
authRouter.post('/changePassword', changePassword);


module.exports = {
    authRouter
};
