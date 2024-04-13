const { Category } = require('../models');

const addCategory = async (name) => {
  const category = await Category.create({ name });
  return {
    id: category.id,
    name: category.name,
  };
};

const findAll = async () => {
  const categories = await Category.findAll();  
  return categories;
};

module.exports = {
  addCategory,
  findAll,
};