const express = require('express');
const { userController, loginController, categoryController, 
  blogPostController, postController } = require('./controller/index');
const { loginMiddleware } = require('./middlewares/validateUser.middleware');
const { validateNewUser } = require('./middlewares/validateNewUser.middleware');
const { ValidateToken } = require('./middlewares/validateToken.middleware');
const { validateNameCategory } = require('./middlewares/validateCategory.middleware');
const { validatePost } = require('./middlewares/validatePost.middleware');
const { validateUpdatePost } = require('./middlewares/validateUpdatePost.middleware');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', loginMiddleware, loginController.login);
app.post('/user', validateNewUser, userController.addUser);

app.get('/user', ValidateToken, userController.getAll);
app.get('/user/:id', ValidateToken, userController.getById);
app.delete('/user/me', ValidateToken, userController.deleteUser);

app.post('/categories', ValidateToken, validateNameCategory, categoryController.addCategory);
app.get('/categories', ValidateToken, categoryController.getAll);

app.post('/post', ValidateToken, validatePost, blogPostController.addPost);
app.get('/post', ValidateToken, blogPostController.getAll);
app.get('/post/:id', ValidateToken, blogPostController.getById);
app.put('/post/:id', ValidateToken, validateUpdatePost, blogPostController.updatePost);
app.delete('/post/:id', ValidateToken, postController.deletePost);
app.get('/post/search', ValidateToken, postController.searchPost);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
