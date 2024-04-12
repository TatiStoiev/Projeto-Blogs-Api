const { postServices } = require('../services/index');
const { mapStatusHttp } = require('../utils/mapStatusHttp');

const addPost = async (req, res) => {
  const { categoryIds } = req.body;
  console.log('categoryIds na controller', categoryIds)

  const categories = await postServices.verifyCategoryId(categoryIds);
  console.log('categories no controller', categories)
  
  if (categories === null) {
    return res.status(201).send();
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