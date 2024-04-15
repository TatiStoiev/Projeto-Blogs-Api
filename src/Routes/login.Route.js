const express = require('express');
const { loginMiddleware } = require('../middlewares/validateUser.middleware');
const { loginController } = require('../controller/index');

const LoginRouter = express.Router();

LoginRouter.post('/login', loginMiddleware, loginController.login);

module.exports = LoginRouter;