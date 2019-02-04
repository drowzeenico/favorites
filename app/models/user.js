'use strict';
const UserSchema = require('./schemas/user');
const UserService = require('../services/user');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', UserSchema(DataTypes), {});

  User.associate = function(models) {
    // associations can be defined here
  };

  User.beforeCreate((user) => {
    const service = new UserService(user);
    user.password = service.hashPassword();
  })
  return User;
};