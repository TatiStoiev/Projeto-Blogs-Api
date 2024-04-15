const express = require('express');

const LoginRouter = require('./Routes/login.Route');
const UserRouter = require('./Routes/user.Route');
const CategoriesRouter = require('./Routes/categories.Route');
const PostRouter = require('./Routes/post.Route');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use(LoginRouter);
app.use(UserRouter);
app.use(CategoriesRouter);
app.use(PostRouter);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
