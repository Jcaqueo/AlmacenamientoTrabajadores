'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Proyects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      text_status: {
        type: Sequelize.STRING
      },
      id_client: {
        type: Sequelize.INTEGER,
        references:{
          model: "Clients",
          key: "id",
          as: "id_client",
        },
      },
      alert_status: {
        type: Sequelize.INTEGER,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Proyects');
  }
};