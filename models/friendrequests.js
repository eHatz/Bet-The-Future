'use strict';
module.exports = function(sequelize, DataTypes) {
  var FriendRequests = sequelize.define('FriendRequests', {
    RequestSender: DataTypes.STRING,
    RequestReceiver: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return FriendRequests;
};