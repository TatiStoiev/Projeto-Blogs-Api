const jwt = require('jsonwebtoken');
const { userServices } = require('../services/index');
const { mapStatusHttp } = require('../utils/mapStatusHttp');

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

const getAll = async (req, res) => {
  const users = await userServices.findAll();
  return res.status(200).json(users);
};

const getById = async (req, res) => {
  const id = Number(req.params.id);
  const user = await userServices.findById(id);
  if (user.status === 'USER_INVALID') {
    const status = 'USER_INVALID';
    return res.status(mapStatusHttp(status)).json(user.data);
  }
  
  const status = 'SUCCESSFUL';
  return res.status(mapStatusHttp(status)).json(user);
};

module.exports = {
  addUser,
  getAll,
  getById,
};