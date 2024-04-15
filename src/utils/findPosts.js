const { BlogPost } = require('../models');

const findPosts = async (userId) => {
  const userPosts = await BlogPost.findAll({
    where: { userId },
    attributes: ['id'],
  });
  const postIds = userPosts.map((post) => post.id);
  return postIds;
};

module.exports = {
  findPosts,
};