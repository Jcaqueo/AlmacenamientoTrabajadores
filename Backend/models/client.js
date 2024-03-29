'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Client.hasMany(models.Proyect,{
        foreignKey:"id_client",
      });
    }
  };
  Client.init({
    name: DataTypes.STRING,
    pass: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    company: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Client',
    timestamps: false,
  });
  return Client;
};