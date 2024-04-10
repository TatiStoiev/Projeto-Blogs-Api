'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
    await queryInterface.createTable('posts_categories', {
      post_id: {
        type: Sequelize.INTEGER(50), 
        references: {
          model: 'blog_posts',
          key: 'id',
        },
        primaryKey: true,
      },
      category_id: {
        type: Sequelize.INTEGER(20),
        primaryKey: true,
        references: {
          model: 'categories', 
          key: 'id',
        },
        primaryKey: true,
      },
    })
  },

  async down (queryInterface, Sequelize) {
 
    await queryInterface.dropTable('posts_categories');
  }
};
