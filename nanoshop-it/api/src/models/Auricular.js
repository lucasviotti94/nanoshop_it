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
      allowNull: true,
    },
    inalambrico: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
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
