require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize("nanoide", "postgres", "Minotauro90??", {
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
  Conjunto,
  Fuente,
  Funda,
  Malla,
  ModelosDD,
  Reloj,
  Tablet,
  Vidrio_Protector,
} = Modelos;

Conjunto.hasMany(Adaptador, { foreignKey: "Conjunto_Adaptadores" });
Adaptador.belongsTo(Conjunto, { foreignKey: "Conjunto_Adaptadores" });

Conjunto.hasMany(Auricular, { foreignKey: "Conjunto_Auriculares" });
Auricular.belongsTo(Conjunto, { foreignKey: "Conjunto_Auriculares" });

Conjunto.hasMany(Cable, { foreignKey: "Conjunto_Cables" });
Cable.belongsTo(Conjunto, { foreignKey: "Conjunto_Cables" });

Conjunto.hasMany(Cargador, { foreignKey: "Conjunto_Cargadores" });
Cargador.belongsTo(Conjunto, { foreignKey: "Conjunto_Cargadores" });

Conjunto.hasMany(Celular, { foreignKey: "Conjunto_Celulares" });
Celular.belongsTo(Conjunto, { foreignKey: "Conjunto_Celulares" });

Conjunto.hasMany(Computadora, { foreignKey: "Conjunto_Computadoras" });
Computadora.belongsTo(Conjunto, { foreignKey: "Conjunto_Computadoras" });

Conjunto.hasMany(Fuente, { foreignKey: "Conjunto_Fuentes" });
Fuente.belongsTo(Conjunto, { foreignKey: "Conjunto_Fuentes" });

Conjunto.hasMany(Funda, { foreignKey: "Conjunto_Fundas" });
Funda.belongsTo(Conjunto, { foreignKey: "Conjunto_Fundas" });

Conjunto.hasMany(Malla, { foreignKey: "Conjunto_Mallas" });
Malla.belongsTo(Conjunto, { foreignKey: "Conjunto_Mallas" });

Conjunto.hasMany(Reloj, { foreignKey: "Conjunto_Relojes" });
Reloj.belongsTo(Conjunto, { foreignKey: "Conjunto_Relojes" });

Conjunto.hasMany(Tablet, { foreignKey: "Conjunto_Tablets" });
Tablet.belongsTo(Conjunto, { foreignKey: "Conjunto_Tablets" });

Conjunto.hasMany(Vidrio_Protector, { foreignKey: "Conjunto_Vidrio" });
Vidrio_Protector.belongsTo(Conjunto, { foreignKey: "Conjunto_Vidrio" });

module.exports = {
  conn: sequelize,
  Modelos,
  Op, // para importart la conexión { conn } = require('./db.js');
};
