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

const createPost = async (post) => {
  const { title, content, categoryIds, UserId } = post;

  const response = await BlogPost.create({ title, content, UserId });
  await Promise.all(
    categoryIds.map((categoryId) => 
      PostCategory.create({ postId: response.id, categoryId })),
  );
  const createdPost = {
    id: response.dataValues.id,
    title: response.dataValues.title,
    content: response.dataValues.content,
    UserId,
    updated: response.dataValues.updated,
    published: response.dataValues.published,
  };
  
  return createdPost;
};

module.exports = {
  verifyCategoryId,
  createPost,
};