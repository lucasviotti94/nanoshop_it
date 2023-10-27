const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("ModelosDD", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      //nombre del modelo
      type: DataTypes.STRING,
      allowNull: false,
    },
    producto: {
      //nombre del prodeucto del que proviene
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
