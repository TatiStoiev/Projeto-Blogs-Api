const jwt = require('jsonwebtoken');
const { userServices } = require('../services/index');

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userServices.login({ email, password });
  if (!user) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const secret = process.env.JWT_SECRET;

  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  }; 

  const token = jwt.sign({ data: { email } }, secret, jwtConfig);
  return res.status(200).json({ token });
};

module.exports = {
  login,
};