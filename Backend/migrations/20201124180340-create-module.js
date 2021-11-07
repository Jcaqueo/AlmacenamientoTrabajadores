'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Modules', {
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
      id_proyect: {
        type: Sequelize.INTEGER,
        references:{
          model: "Proyects",
          key: "id",
          as: "id_proyect",
        },
      },
      id_developer: {
        type: Sequelize.INTEGER,
        references:{
          model: "Developers",
          key: "id",
          as: "id_developer",
        }
      },
      progress: {
        type: Sequelize.STRING
      },
      comment_status: {
        type: Sequelize.INTEGER
      },
      comment_proyect_manager: {
        type: Sequelize.STRING
      },
      comment_developer: {
        type: Sequelize.STRING
      },
      comment_client: {
        type: Sequelize.STRING
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Modules');
  }
};