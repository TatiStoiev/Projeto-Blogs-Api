const UserModel = require('../models/User');
const auth = require('../utils/auth');

const login = async (email, password) => {
  const user = await UserModel.findOne({ 
    where: { email, password } });
  if (!user) {
    return { status: 'INVALID_VALUE', data: { message: 'Invalid fields' } };
  }

  const token = await auth.createToken(user.id);
  return token; 
};

module.exports = {
  login,
};