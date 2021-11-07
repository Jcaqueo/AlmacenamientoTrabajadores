'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Module.belongsTo(models.Developer,{
        foreignKey:"id_developer",
      });

      Module.belongsTo(models.Proyect,{
        foreignKey:"id_proyect",
      });

      Module.hasMany(models.Chat,{
        foreignKey:"id_modulo",
      });

    }
  };
  Module.init({
    name: DataTypes.STRING,
    date: DataTypes.STRING,
    status: DataTypes.STRING,
    text_status: DataTypes.STRING,
    id_proyect: DataTypes.INTEGER,
    id_developer: DataTypes.INTEGER,
    progress: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Module',
    timestamps: false,
  });
  return Module;
};