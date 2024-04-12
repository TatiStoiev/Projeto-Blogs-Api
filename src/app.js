const express = require('express');
const { userController, loginController, categoryController } = require('./controller/index');
const { loginMiddleware } = require('./middlewares/validateUser.middleware');
const { validateNewUser } = require('./middlewares/validateNewUser.middleware');
const { ValidateToken } = require('./middlewares/validateToken.middleware');
const { validateNameCategory } = require('./middlewares/validateCategory.middleware');

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

app.post('/categories', ValidateToken, validateNameCategory, categoryController.addCategory);
app.get('/categories', ValidateToken, categoryController.getAll);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
