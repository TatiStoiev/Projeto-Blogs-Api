module.exports = (Sequelize, DataTypes) => {
    const BlogPost = Sequelize.define('BlogPost', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey:true,
          },
          title: {
            type: DataTypes.STRING(255), 
          },
          content: {
            type: DataTypes.STRING(255),
          },
          userId: {
            type: DataTypes.INTEGER,
            references: {
              model: 'users',
              key: 'id',
            }
          },
          published: {
            type: DataTypes.DATE,
          },
          updated: {
            type: DataTypes.DATE,
          }
          },{ 
          tableName: 'blog_posts', 
          timestamps: false, 
          underscored: true,
          }
    );

    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, {
            foreignKey: 'userId', 
            as: 'User'
        }) 
    }
    return BlogPost;
};