'use strict';
// added
const bcrypt = require('bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    validPassword(passwordTyped) {
      return bcrypt.compareSync(passwordTyped, this.password);
    };

    // remove the password before serializing
    toJSON() {
      let userData = this.get();
      delete userData.password;
      return userData;
    }
  };
  //changed
  users.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    userName: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [1, 99],
            msg: 'Name must be between 1 and 99 characters'
          }
        }
      },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4, 99],
          msg: 'Password must be between 8 and 99 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'users',
  });

  users.beforeCreate((pendingUser, options) => {
    if (pendingUser && pendingUser.password) {
      // hash the password
      let hash = bcrypt.hashSync(pendingUser.password, 12);
      // store the hash as the user's password
      pendingUser.password = hash;
    }
  })

  return users;
};