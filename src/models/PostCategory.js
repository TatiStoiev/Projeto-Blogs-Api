module.exports = (Sequelize, DataTypes) => {
    const PostCategory = Sequelize.define('PostCategory', {
        postId: {
            type: DataTypes.INTEGER(50), 
            references: {
              model: 'blog_posts',
              key: 'id',
              primaryKey: true,
            },
          },
          categoryId: {
            type: DataTypes.INTEGER(20),
            primaryKey: true,
            references: {
                model: 'categories', 
                key: 'id',
            },
        },
    
          tableName: 'posts_categories', 
          timestamps: false, 
          underscored: true,
    })   
    return PostCategory;
};