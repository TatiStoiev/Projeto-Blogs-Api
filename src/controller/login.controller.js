const { userServices } = require('../services/index');

const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await userServices.login(email, password);
  return res.status(200).json(result);
};

module.exports = {
  login,
};