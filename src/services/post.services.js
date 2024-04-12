const { Category } = require('../models');

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
  verifyCategoryId,
};