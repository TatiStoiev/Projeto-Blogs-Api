const { User } = require('../models');

const login = async (email, password) => {  
  const user = await User.findOne({ 
    where: { email, password }, 
    attributes: ['id', 'email'],  
  });

  const UserId = user.dataValues.id;
  const UserEmail = user.dataValues.email; 

  if (!user) {
    return { status: 'INVALID_VALUE', data: { message: 'Invalid fields' } };
  }
  return { status: 'SUCCESSFUL',
    data: { UserId, UserEmail } };
};

module.exports = {
  login,
};