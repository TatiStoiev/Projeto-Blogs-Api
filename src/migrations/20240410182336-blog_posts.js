'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('blog_posts', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true,
      },
      title: {
        type: Sequelize.STRING(255), 
      },
      content: {
        type: Sequelize.STRING(255),
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        }
      },
      published: {
        type: Sequelize.DATE,
      },
      updated: {
        type: Sequelize.DATE,
      },
    })
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.dropTable('blog_posts')
  }
};
