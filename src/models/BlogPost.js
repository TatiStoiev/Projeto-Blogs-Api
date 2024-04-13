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
            allowNull: false,
          },
          content: {
            type: DataTypes.STRING(255),
            allowNull: false,
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
            defaultValue: DataTypes.NOW,
          },
          updated: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
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