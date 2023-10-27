const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Auricular", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    producto: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Auricular",
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Apple",
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ficha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inalambrico: {
      type: DataTypes.BOOLEAN,
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
