const { Category, BlogPost, PostCategory } = require('../models');

const verifyCategoryId = async (categoryIds) => {
  if (Array.isArray(categoryIds)) {
    const AllCategories = await Category.findAll();

    const existingIds = AllCategories.map((category) => category.id);

    const notFoundIds = categoryIds.filter((id) => !existingIds.includes(id));

    if (notFoundIds.length === 0) {
      return null;
    }
    if (notFoundIds.length >= 1) {
      return { status: 'INVALID_VALUE', data: { message: 'one or more "categoryIds" not found' } };
    }
  }
};

//buscar o id do usuario pelo token ou pelo create 
//inserir um valor default para a data atual do updated e published
const createPost = async (post) => {
  const { title, content, categoryIds } = post;

  const response = await BlogPost.create({ title, content });
  await Promise.all(
    categoryIds.map((categoryId) => 
      PostCategory.create({ postId: response.id, categoryId })),
  );
  const createdPost = {
    id: response.dataValues.id,
    title: response.dataValues.title,
    content: response.dataValues.content,
    userId: response.dataValues.userId,
    updated: response.dataValues.updated,
    published: response.dataValues.published,
  }
  console.log('createdpost no service', createdPost)
  return createdPost;
};

module.exports = {
  verifyCategoryId,
  createPost,
};