const jwt = require('jsonwebtoken');
const { userServices } = require('../services/index');
const { mapStatusHttp } = require('../utils/auth');

const login = async (req, res) => {
  const { email, password } = req.body;
  
  const result = await userServices.login(email, password);
  if (result.status === 'INVALID_VALUE') {
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
  return res.status(mapStatusHttp(status)).json({ token });
};

const addUser = async (req, res) => {
  const { email } = req.body;
  const profile = req.body;

  const emailRegistered = await userServices.emailAlreadyExists(email);
  
  if (emailRegistered) {
    const status = 'USER_REGISTERED';
    return res.status(mapStatusHttp(status)).json({ message: 'User already registered' });
  } 
  
  await userServices.addUser(profile);

  const secret = process.env.JWT_SECRET;

  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  }; 

  const token = jwt.sign({ data: { email } }, secret, jwtConfig);
  const status = 'REGISTERED';
  return res.status(mapStatusHttp(status)).json({ token });
};

module.exports = {
  login,
  addUser,
};