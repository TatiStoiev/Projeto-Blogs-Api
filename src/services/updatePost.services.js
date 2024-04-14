const { BlogPost, User, Category, PostCategory } = require('../models');

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

const deletePost = async (id) => {
  await PostCategory.destroy({ where: { postId: id } });
  const rowsAffected = await BlogPost.destroy(
    { where: { id } },
  );
  if (rowsAffected >= 1) {
    return { status: 'SUCCESSFUL', rowsAffected };
  }
};

module.exports = {
  updatePost,
  deletePost,
};
