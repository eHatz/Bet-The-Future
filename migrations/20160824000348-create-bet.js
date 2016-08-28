'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Bets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      admin: {
        type: Sequelize.STRING
      },
      adminImageLink: {
        type: Sequelize.STRING
      },
      prediction: {
        type: Sequelize.STRING
      },
      referee: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      judgmentDay: {
        type: Sequelize.DATE 
        // DATEONLY is the option we want
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Bets');
  }
};