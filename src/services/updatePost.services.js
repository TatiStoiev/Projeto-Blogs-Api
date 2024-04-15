const { Op } = require('sequelize');
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
  await PostCategory.destroy({ 
    where: { postId: id },
  });

  const rowsAffected = await BlogPost.destroy({ 
    where: { id },
  });

  if (rowsAffected) {
    return { status: 'SUCCESSFUL', rowsAffected };
  }
};  

const findPostBySearch = async (searchTerm) => {
  const post = await BlogPost.findAll({ 
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${searchTerm}%` } }, // consulta na documentação 
        { content: { [Op.like]: `%${searchTerm}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return post;
};

module.exports = {
  updatePost,
  deletePost,
  findPostBySearch,
};
