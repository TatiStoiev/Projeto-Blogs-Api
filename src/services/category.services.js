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

const verifyCategoryId = async (categoryIds) => {
  if (Array.isArray(categoryIds)) {
    const AllCategories = await Category.findAll();

    const existingIds = AllCategories.map((category) => category.id);

    const notFoundIds = categoryIds.filter((id) => !existingIds.includes(id));

    if (notFoundIds.length === 0) {
      return null;
    }
    if (notFoundIds.length >= 1) {
      return { status: 'INVALID_VALUE', data: { message: 'one or more "categoryIds" not found' } };
    }
  }
};

module.exports = {
  addCategory,
  findAll,
  verifyCategoryId,
};