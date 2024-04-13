const jwt = require('jsonwebtoken');
const { loginServices } = require('../services/index');
const { mapStatusHttp } = require('../utils/mapStatusHttp');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
}; 

const login = async (req, res) => {
  const { email, password } = req.body;
  
  const result = await loginServices.login(email, password);
  if (result.status === 'INVALID_VALUE') {
    const status = 'INVALID_VALUE';
    return res.status(mapStatusHttp(status)).json({ message: 'Invalid fields' });
  }

  const { data } = result;
  const { UserId } = data;
  const tokenPayload = {
    data: {
      email, 
      UserId,
    },
  };

  const token = jwt.sign(tokenPayload, secret, jwtConfig);
  const status = 'SUCCESSFUL';
  return res.status(mapStatusHttp(status)).json({ token });
};

module.exports = {
  login,
};