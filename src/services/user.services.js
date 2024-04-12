const { User } = require('../models');

const login = async (email, password) => {  
  const user = await User.findOne({ 
    where: { email, password } });
  if (!user) {
    return { status: 'INVALID_VALUE', data: { message: 'Invalid fields' } };
  }
  return { status: 'SUCCESSFUL', data: { user } };
};

const emailAlreadyExists = async (email) => {
  const result = await User.findOne({ 
    where: { email } });
  return !!result; // esses dois !! foi dica do chatgpt
};

const addUser = async (profile) => {  
  const userCreated = await User.create(profile);
  return {
    id: userCreated.id,
    ...userCreated,
  };
};

const findAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });  
  return users;
};

module.exports = {
  login,
  emailAlreadyExists,
  addUser,
  findAll,
};
