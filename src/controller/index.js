const userController = require('./user.controller');
const loginController = require('./longin.controller');
const categoryController = require('./category.controller');
const blogPostController = require('./blogPost.controller');
const deletePostController = require('./deletePost.controller');

module.exports = {
  userController,
  loginController, 
  categoryController,
  blogPostController,
  deletePostController,
};