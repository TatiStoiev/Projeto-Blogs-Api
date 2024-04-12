module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          }, 
          name: {
          type: DataTypes.STRING(255),
          allowNull: false,
          }
    }, {
        tableName: 'categories', 
        timestamps: false, 
        underscored: true,
    })

    return Category;
};