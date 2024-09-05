const express = require('express');
const { signIn, changePassword, getAdminByToken } = require('../Controllers/Auth.controller');
const { checkToken } = require('../../../middlewares/checkToken');

const authRouter = express.Router();

authRouter.post('/signIn', signIn);
authRouter.post('/changePassword', changePassword);
authRouter.get('/getAdminByToken', checkToken, getAdminByToken);

module.exports = {
    authRouter
};
