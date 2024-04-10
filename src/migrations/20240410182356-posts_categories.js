'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
    await queryInterface.createTable('posts_categories', {
      post_id: {
        type: Sequelize.INTEGER(50), 
        primaryKey: true, 
        references: {
          model: 'BlogPosts',
          key: 'id',
        }
      },
      category_id: {
        type: Sequelize.INTEGER(20),
        primaryKey: true,
        references: {
          model: 'Categories', 
          key: 'id',
        }
      },
    })
  },

  async down (queryInterface, Sequelize) {
 
    await queryInterface.dropTable('posts_categories');
  }
};
