const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Fuentes",
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
        allowNull: false,
      },
      almacenamiemto: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: ""
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bateria: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      nuevo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
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
