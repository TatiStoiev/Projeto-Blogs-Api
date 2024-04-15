const express = require('express');
const { userController } = require('../controller/index');
const { ValidateToken } = require('../middlewares/validateToken.middleware');
const { validateNewUser } = require('../middlewares/validateNewUser.middleware');

const UserRouter = express.Router();

UserRouter.post('/user', validateNewUser, userController.addUser);
UserRouter.get('/user', ValidateToken, userController.getAll);
UserRouter.get('/user/:id', ValidateToken, userController.getById);
UserRouter.delete('/user/me', ValidateToken, userController.deleteUser);

module.exports = UserRouter;