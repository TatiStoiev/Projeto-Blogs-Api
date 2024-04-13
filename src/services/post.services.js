const { Category, BlogPost, User, PostCategory } = require('../models');

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

const findById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
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
  if (!post) {
    return { status: 'USER_INVALID', data: { message: 'Post does not exist' } };
  }
  return post;
};

module.exports = { createPost, findAll, findById };
