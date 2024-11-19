'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aparelho extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Aparelho.belongsTo(models.Usuario);
    }
  }
  Aparelho.init({
    name: DataTypes.STRING,
    tipo: DataTypes.STRING,
    voltagem: DataTypes.STRING,
    potencia: DataTypes.STRING,
    valorConsumo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Aparelho',
  });
  return Aparelho;
};