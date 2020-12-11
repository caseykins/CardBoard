'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  cards.init({
    cardName: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    boardId: DataTypes.INTEGER,
    cardList: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cards',
  });
  return cards;
};