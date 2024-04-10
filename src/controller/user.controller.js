const { userServices } = require('../services/index');
const { mapStatusHttp } = require('../utils/mapStatusHttp');

const login = async (req, res) => {
  const { email, password } = req.body;

  const { status, data } = await userServices.login({ email, password });
  return res.status(mapStatusHttp(status)).json(data);
};

module.exports = {
  login,
};