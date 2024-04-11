const { UserModel } = require('../models');

const login = async (email, password) => {
  const user = await UserModel.findOne({ 
    where: { email, password } });
  if (!user) {
    return { status: 'INVALID_VALUE', data: { message: 'Invalid fields' } };
  }
  return { status: 'SUCCESSFUL', data: { user } };
};

module.exports = {
  login,
};
