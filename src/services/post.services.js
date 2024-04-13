const { Category, BlogPost, User, PostCategory } = require('../models');

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
  const { title, content, categoryIds, userId } = post;

  const response = await BlogPost.create({ title, content, userId });
  console.log('response.id', response.id);
  await Promise.all(
    categoryIds.map((categoryId) => 
      PostCategory.create({ postId: response.id, categoryId })),
  );
  console.log('response do cadastro do token', response);
  const createdPost = {
    id: response.dataValues.id,
    title: response.dataValues.title,
    content: response.dataValues.content,
    userId,
    updated: response.dataValues.updated,
    published: response.dataValues.published,
  };

  console.log('a createdpost do service', createdPost);
  
  return createdPost;
};

const findAll = async () => {
  const allPosts = await BlogPost.findAll({
    include: [ 
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      }, {
        model: Category,
        as: 'categories' },
    ],
  });
  return allPosts;
};

module.exports = {
  verifyCategoryId, createPost, findAll };
