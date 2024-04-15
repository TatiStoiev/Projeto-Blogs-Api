const express = require('express');
const { blogPostController, postController } = require('../controller/index');
const { ValidateToken } = require('../middlewares/validateToken.middleware');
const { validatePost } = require('../middlewares/validatePost.middleware');
const { validateUpdatePost } = require('../middlewares/validateUpdatePost.middleware');

const PostRouter = express.Router();

PostRouter.post('/post', ValidateToken, validatePost, blogPostController.addPost);
PostRouter.get('/post', ValidateToken, blogPostController.getAll);
PostRouter.get('/post/search', ValidateToken, postController.searchPost);
PostRouter.get('/post/:id', ValidateToken, blogPostController.getById);
PostRouter.put('/post/:id', ValidateToken, validateUpdatePost, blogPostController.updatePost);
PostRouter.delete('/post/:id', ValidateToken, postController.deletePost);

module.exports = PostRouter;