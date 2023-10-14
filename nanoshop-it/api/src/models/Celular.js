const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Celular", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Iphone",
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    almacenamiemto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bateria: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
