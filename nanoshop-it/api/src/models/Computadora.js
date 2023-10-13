const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Computadora",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
      memoria: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      almacenamiemto: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      pantalla: {
        type: DataTypes.STRING,
        allowNull: false
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false
      },
      chip: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      precio: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      fecha: {
        defaultValue: DataTypes.NOW
      }
    }

  );
};
