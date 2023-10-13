const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Cargador",
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
        allowNull: true
      },      
      inalambrico: {            
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },      
      deAuto: {                    //Si es para cargador para autos
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
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