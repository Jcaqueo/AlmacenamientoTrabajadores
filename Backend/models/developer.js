'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Developer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Developer.hasMany(models.Module,{
        foreignKey:"id_developer",
      });
      Developer.hasMany(models.Comment,{
        foreignKey:"id_developer",
      });
    }
  };
  Developer.init({
    name: DataTypes.STRING,
    pass: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    company: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Developer',
    timestamps: false,
  });
  return Developer;
};