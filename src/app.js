const express = require('express');
const { userController } = require('./controller/index');
const { loginMiddleware } = require('./middlewares/validateUser.middleware');
const { validateNewUser } = require('./middlewares/validateNewUser.middleware');
const { ValidateToken } = require('./middlewares/validateToken.middleware');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', loginMiddleware, userController.login);
app.post('/user', validateNewUser, userController.addUser);

app.get('/user', ValidateToken, userController.getAll);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
