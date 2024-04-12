const { categoryServices } = require('../services/index');

const addCategory = async (req, res) => {
  const { name } = req.body;
  console.log('name no controller', name);

  const categoryCreated = await categoryServices.addCategory(name);
  return res.status(201).json(categoryCreated);
};

const getAll = async (req, res) => {
  const categories = await categoryServices.findAll();
  return res.status(200).json(categories);
};

module.exports = {
  addCategory,
  getAll,
};