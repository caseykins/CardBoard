'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class boards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  boards.init({
    userID: DataTypes.INTEGER,
    backgroundImg: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'boards',
  });
  return boards;
};