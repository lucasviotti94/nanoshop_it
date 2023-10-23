const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Cable", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    producto: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Cable",
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Apple",
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ficha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    largo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "blanco",
    },
    informacion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};
