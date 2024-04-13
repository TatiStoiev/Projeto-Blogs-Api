const { BlogPost, User, Category } = require('../models');

const updatePost = async (title, content, id, userId) => {
  const userIdIsTheOwner = await BlogPost.findOne({ where: { id, userId } });
  console.log('useristheowner', userIdIsTheOwner);
  if (!userIdIsTheOwner) {
    return { status: 'NOT_FOUND', data: { message: 'Unauthorized user' } };
  }
  await BlogPost.update({ title, content }, { where: { id, userId } });  
  const updatedPost = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } }, {
        model: Category, as: 'categories' },
    ],
  });
  return { status: 'SUCCESSFUL', data: updatedPost };
};

module.exports = {
  updatePost,
};