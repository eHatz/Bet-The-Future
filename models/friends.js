'use strict';
module.exports = function(sequelize, DataTypes) {
  var Friends = sequelize.define('Friends', {
    User1: DataTypes.STRING,
    User2: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Friends;
};