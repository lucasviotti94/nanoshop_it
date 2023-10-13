const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Auricular",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      marca: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Apple"
      },
      modelo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ficha: {
        type: DataTypes.STRING,
        allowNull: false
      },
      inalambrico: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      precio: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      color: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "blanco"
      },
      fecha: {
        defaultValue: DataTypes.NOW
      }
    }
  );
};