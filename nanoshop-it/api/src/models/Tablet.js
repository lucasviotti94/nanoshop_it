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
      allowNull: true,
      defaultValue: "Apple",
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    almacenamiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    pantalla: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Nuevo",
    },
    informacion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imagenUbicacion: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    favorito: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  });
};
