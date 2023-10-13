const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Adaptador",
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
      tipo: {
        type: DataTypes.STRING,
        allowNull: true
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
