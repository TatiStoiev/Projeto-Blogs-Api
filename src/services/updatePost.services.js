const { BlogPost, User, Category } = require('../models');

const updatePost = async (id, title, content) => {
  await BlogPost.update({ title, content }, { where: { id } });  
  const updatedPost = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } }, {
        model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { status: 'SUCCESSFUL', data: updatedPost };
};

module.exports = {
  updatePost,
};
