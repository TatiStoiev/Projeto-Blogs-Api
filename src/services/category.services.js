const { Category } = require('../models');

const addCategory = async (name) => {
  console.log('name no service', name);
  const category = await Category.create({ name });
  console.log('category no service', category);
  return {
    id: category.id,
    name: category.name,
  };
};

module.exports = {
  addCategory,
};