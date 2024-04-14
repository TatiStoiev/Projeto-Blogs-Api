const { postServices, categoryServices, updatePostServices } = require('../services/index');
const { mapStatusHttp } = require('../utils/mapStatusHttp');

const statusUserInvalid = 'USER_INVALID';
const statusInvalidValue = 'INVALID_VALUE';

const addPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { UserId } = req.user;

  const categories = await categoryServices.verifyCategoryId(categoryIds);
  
  if (categories === null) {
    const createdPost = await postServices
      .createPost({ title, content, categoryIds, userId: UserId });
    return res.status(201).json({ createdPost });
  }
  if (categories.status === 'INVALID_VALUE') {
    return res.status(mapStatusHttp(statusInvalidValue)).json(categories.data);
  }
}; 

const getAll = async (req, res) => {
  const allPosts = await postServices.findAll();
  return res.status(200).json(allPosts);
};

const getById = async (req, res) => {
  const id = Number(req.params.id);

  const post = await postServices.findById(id);
  if (post.status === 'USER_INVALID') {
    return res.status(mapStatusHttp(statusUserInvalid)).json(post.data);
  }
  return res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const userId = req.user.UserId;
  const id = Number(req.params.id);
  const { title, content } = req.body;

  const userIdIsTheOwner = await postServices.findById(id);
  if (userIdIsTheOwner.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  const updatedPost = await updatePostServices.updatePost(id, title, content); 
  if (updatedPost.status === 'SUCCESSFUL') {
    const status = 'SUCCESSFUL';
    return res.status(mapStatusHttp(status)).json(updatedPost.data);
  }
};

module.exports = {
  addPost,
  getAll,
  getById,
  updatePost,
};