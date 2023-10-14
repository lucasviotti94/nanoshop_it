const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Computadora", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    memoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    almacenamiemto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pantalla: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chip: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
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
    fecha: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.NOW,
    },
  });
};
