const UserModel = require('../models/User');

const login = async (email, password) => {
  const { status, data } = await UserModel.findOne({ 
    where: { email, password } });
    if (!user)
};

module.exports = {
  login,
};