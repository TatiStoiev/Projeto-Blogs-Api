module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          }, 
          displayName: {
            type: DataTypes.STRING(255),
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false,
          },
          password: {
            type: DataTypes.STRING(255),
            allowNull: false,
          },
          image: {
            type: DataTypes.STRING(255),  
          }     
    }, {
        tableName: 'users', 
        timestamps: false, 
        underscored: true,
    })

   User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      foreignKey: 'id',
      as: 'posts'
    })
   }

    return User;
}; 
