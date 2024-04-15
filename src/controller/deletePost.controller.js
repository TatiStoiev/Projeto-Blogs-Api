const { postServices, updatePostServices } = require('../services/index');

const deletePost = async (req, res) => {
  const userId = req.user.UserId;
  const id = Number(req.params.id);

  const post = await postServices.findById(id);

  if (post.status === 'INVALID') {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  if (post.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  const deletedPost = await updatePostServices.deletePost(id); 
  if (deletedPost.status === 'SUCCESSFUL') {
    return res.status(204).end();
  }
};
  
module.exports = { deletePost };