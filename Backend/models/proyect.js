'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proyect extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Proyect.belongsTo(models.Client,{
        foreignKey:"id_client",
      });

      Proyect.hasMany(models.Module,{
        foreignKey:"id_proyect",
      });
    }
  };
  Proyect.init({
    name: DataTypes.STRING,
    date: DataTypes.STRING,
    status: DataTypes.STRING,
    text_status: DataTypes.STRING,
    id_client: DataTypes.INTEGER,
    alert_status: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Proyect',
    timestamps: false,
  });
  return Proyect;
};