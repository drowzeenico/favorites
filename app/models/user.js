'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      isAlpha: true,
      notNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      isAlpha: true,
      notNull: true
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      notNull: true
    },
    password: {
      type: DataTypes.STRING,
      notNull: true
    },
    birthday: {
      type: DataTypes.DATE,
      notNull: true
    }, 
    gender: {
      type: DataTypes.ENUM(0, 1),
      notNull: true
    }
  }, {});

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};