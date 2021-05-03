'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alunos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Alunos.hasMany(models.Notas)
      Alunos.belongsTo(models.Series)
      Alunos.belongsTo(models.Users)
    }
  };
  Alunos.init({
    nome: DataTypes.STRING,
    numero_matricula: DataTypes.STRING,
    cpf: DataTypes.STRING,
    sexo: DataTypes.STRING,
    idade: DataTypes.INTEGER,
    telefone: DataTypes.STRING,
    endereco: DataTypes.STRING,
    SeriesId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Alunos',

  });
  return Alunos;
};