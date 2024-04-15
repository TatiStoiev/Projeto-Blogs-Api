const { postServices, updatePostServices } = require('../services/index');
const { mapStatusHttp } = require('../utils/mapStatusHttp');

const deletePost = async (req, res) => {
  const userId = req.user;
  const id = Number(req.params.id);
  
  const post = await postServices.findById(id);

  if (post.status === 'USER_INVALID') {
    const status = 'USER_INVALID';
    return res.status(mapStatusHttp(status)).json(post.data);
  }
  if (post.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  const deletedPost = await updatePostServices.deletePost(id); 
  if (deletedPost.status === 'SUCCESSFUL') {
    return res.status(204).send();
  }  
};
  
module.exports = { deletePost };