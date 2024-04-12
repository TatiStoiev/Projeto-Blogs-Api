const { postServices } = require('../services/index');
const { mapStatusHttp } = require('../utils/mapStatusHttp');

const addPost = async (req, res) => {
  const { categoryIds } = req.body;

  const categories = await postServices.verifyCategoryId(categoryIds);
  
  if (categories === null) {
    const createdPost = await postServices.createPost(req.body);
    console.log('createdpost no controller', createdPost)
    return res.status(201).json({ createdPost });
  }
  if (categories.status === 'INVALID_VALUE') {
    const status = 'INVALID_VALUE';
    return res.status(mapStatusHttp(status))
      .json(categories.data);
  }
}; 

module.exports = {
  addPost,
};