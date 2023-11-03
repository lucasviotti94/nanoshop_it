require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize("dbhuevo", "postgres", "Minotauro90??", {
  host: "localhost",
  dialect: "postgres",
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const Modelos = sequelize.models;

// Aca vendrian las relaciones

const {
  Adaptador,
  Auricular,
  Cable,
  Cargador,
  Celular,
  Computadora,
  ConjuntoDeProductos,
  Fuente,
  Funda,
  Malla,
  ModelosDD,
  Reloj,
  Tablet,
  Vidrio_Protector,
} = Modelos;

ConjuntoDeProductos.hasMany(Adaptador, {
  foreignKey: "Conjunto_Adaptadores",
});
Adaptador.belongsTo(ConjuntoDeProductos, {
  foreignKey: "Conjunto_Adaptadores",
});

ConjuntoDeProductos.hasMany(Auricular, {
  foreignKey: "Conjunto_Auriculares",
});
Auricular.belongsTo(ConjuntoDeProductos, {
  foreignKey: "Conjunto_Auriculares",
});

ConjuntoDeProductos.hasMany(Cable, { foreignKey: "Conjunto_Cables" });
Cable.belongsTo(ConjuntoDeProductos, { foreignKey: "Conjunto_Cables" });

ConjuntoDeProductos.hasMany(Cargador, {
  foreignKey: "Conjunto_Cargadores",
});
Cargador.belongsTo(ConjuntoDeProductos, { foreignKey: "Conjunto_Cargadores" });

ConjuntoDeProductos.hasMany(Celular, { foreignKey: "Conjunto_Celular" });
Celular.belongsTo(ConjuntoDeProductos, { foreignKey: "Conjunto_Celular" });

ConjuntoDeProductos.hasMany(Computadora, {
  foreignKey: "Conjunto_Computadoras",
});
Computadora.belongsTo(ConjuntoDeProductos, {
  foreignKey: "Conjunto_Computadoras",
});

ConjuntoDeProductos.hasMany(Fuente, { foreignKey: "Conjunto_Fuentes" });
Fuente.belongsTo(ConjuntoDeProductos, { foreignKey: "Conjunto_Fuentes" });

ConjuntoDeProductos.hasMany(Funda, { foreignKey: "Conjunto_Funda" });
Funda.belongsTo(ConjuntoDeProductos, { foreignKey: "Conjunto_Funda" });

ConjuntoDeProductos.hasMany(Malla, { foreignKey: "Conjunto_Malla" });
Malla.belongsTo(ConjuntoDeProductos, { foreignKey: "Conjunto_Malla" });

ConjuntoDeProductos.hasMany(ModelosDD, {
  foreignKey: "Conjunto_ModelosDDs",
});
ModelosDD.belongsTo(ConjuntoDeProductos, { foreignKey: "Conjunto_ModelosDDs" });

ConjuntoDeProductos.hasMany(Reloj, { foreignKey: "Conjunto_Relojes" });
Reloj.belongsTo(ConjuntoDeProductos, { foreignKey: "Conjunto_Relojes" });

ConjuntoDeProductos.hasMany(Tablet, { foreignKey: "Conjunto_Tablets" });
Tablet.belongsTo(ConjuntoDeProductos, { foreignKey: "Conjunto_Tablets" });

ConjuntoDeProductos.hasMany(Vidrio_Protector, {
  foreignKey: "Conjunto_Vidrio_Protector",
});
Vidrio_Protector.belongsTo(ConjuntoDeProductos, {
  foreignKey: "Conjunto_Vidrio_Protector",
});

module.exports = {
  conn: sequelize,
  Modelos,
  Op, // para importart la conexión { conn } = require('./db.js');
};
