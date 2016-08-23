'use strict';
module.exports = function(sequelize, DataTypes) {
  var betTable = sequelize.define('betTable', {
    prediction: DataTypes.STRING,
    price: DataTypes.FLOAT,
    users: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return betTable;
};