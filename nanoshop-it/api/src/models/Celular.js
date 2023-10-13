const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Celular",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      marca: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Iphone"
      },
      modelo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      almacenamiemto: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nuevo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      bateria: {
        type: DataTypes.NUMBER,
        allowNull: true
      },
      precio: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      fecha: {
        defaultValue: DataTypes.NOW
      }
    }
  );
};
