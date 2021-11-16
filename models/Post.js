const{ Model, DataTypes, Sequelize } = require('sequelize')
const sequelize = require('../config/connection')

class Post extends Sequelize.Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING
    },
    body: {
      type: DataTypes.STRING,
    },
  },
    {
    
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
        
  }
);

module.exports= Post