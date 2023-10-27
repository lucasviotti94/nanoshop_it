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
      allowNull: true,
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
    color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Blanco",
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Nuevo",
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    informacion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    favorito: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  });
};
