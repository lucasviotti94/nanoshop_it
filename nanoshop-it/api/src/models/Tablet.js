const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Tablet", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    producto: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Tablet",
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Apple",
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tamaño: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    almacenamiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    informacion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};
