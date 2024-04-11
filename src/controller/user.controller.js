const jwt = require('jsonwebtoken');
const { userServices } = require('../services/index');
const { mapStatusHttp } = require('../utils/auth');

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userServices.login({ email, password });
  if (!user) {
    const status = 'INVALID_VALUE';
    return res.status(mapStatusHttp(status)).json({ message: 'Invalid fields' });
  }

  const secret = process.env.JWT_SECRET;

  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  }; 

  const token = jwt.sign({ data: { email } }, secret, jwtConfig);
  const status = 'SUCCESSFUL';
  return res.status(mapStatusHttp(status)).json({ data: { token } });
};

module.exports = {
  login,
};