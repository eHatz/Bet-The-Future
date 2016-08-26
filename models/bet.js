'use strict';
module.exports = function(sequelize, DataTypes) {
  var Bet = sequelize.define('Bet', {
    user: DataTypes.STRING,
    prediction: DataTypes.STRING,
    referee: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    judgmentDay: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Bet.belongsToMany(models.User, {as: 'userId', through: 'UserBet'})
      }
    }
  });
  return Bet;
};