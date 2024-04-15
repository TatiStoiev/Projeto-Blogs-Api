const express = require('express');
const { categoryController } = require('../controller/index');
const { ValidateToken } = require('../middlewares/validateToken.middleware');
const { validateNameCategory } = require('../middlewares/validateCategory.middleware');

const CategoriesRouter = express.Router();

CategoriesRouter.post(
  '/categories', 
  ValidateToken, 
  validateNameCategory, 
  categoryController.addCategory,
);

CategoriesRouter.get('/categories', ValidateToken, categoryController.getAll);

module.exports = CategoriesRouter;