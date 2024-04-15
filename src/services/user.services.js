const { User, BlogPost, PostCategory } = require('../models');
const { findPosts } = require('../utils/findPosts');

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

const findById = async (id) => {
  const user = await User.findOne({
    where: { id } });

  if (!user) {
    return { status: 'USER_INVALID', data: { message: 'User does not exist' } };
  }

  return {
    id: user.id,
    displayName: user.displayName,
    email: user.email,
    image: user.image,
  };
};

const deleteUser = async (userId) => {
  const postIds = await findPosts(userId);

  await PostCategory.destroy({ where: { postId: postIds } });
  await BlogPost.destroy({
    where: { userId } });
  const rowsAffected = await User.destroy({
    where: { id: userId },
  });
  return rowsAffected;
};

module.exports = {
  emailAlreadyExists,
  addUser,
  findAll,
  findById,
  deleteUser,
};
