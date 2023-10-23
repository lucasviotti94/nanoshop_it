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
      allowNull: false,
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
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "blanco",
    },
    informacion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};
