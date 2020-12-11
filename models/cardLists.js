'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cardLists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  cardLists.init({
    listName: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    boardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cardLists',
  });
  return cardLists;
};