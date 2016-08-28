'use strict';
module.exports = function(sequelize, DataTypes) {
  var Bet = sequelize.define('Bet', {
    admin: DataTypes.STRING,
    adminImageLink: DataTypes.STRING,
    prediction: DataTypes.STRING,
    referee: DataTypes.STRING,
    price: DataTypes.STRING,
    judgmentDay: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Bet.belongsToMany(models.User, {through: 'UserBet'})
      }
    }
  });
  return Bet;
};