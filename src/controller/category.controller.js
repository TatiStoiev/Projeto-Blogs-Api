const { categoryServices } = require('../services/index');

const addCategory = async (req, res) => {
  const { name } = req.body;
  console.log('name no controller', name);

  const categoryCreated = await categoryServices.addCategory(name);
  return res.status(201).json(categoryCreated);
};

module.exports = {
  addCategory,
};