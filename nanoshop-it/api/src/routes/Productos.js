const { Router } = require("express");
const { Op, Modelos } = require("../db.js");

const router = Router();

const {
  Adaptador,
  Auricular,
  Cable,
  Cargador,
  Celular,
  Computadora,
  Fuente,
  Funda,
  Malla,
  Reloj,
  Tablet,
  Vidrio_Protector,
} = Modelos;

//Esta ruta es simplemente para traer todos los productos de la base de datos

router.get("/", async (req, res) => {
  try {
    var productosDB = [];

    try {
      let adaptadorDB = await Adaptador.findAll({});
      adaptadorDB.length !== 0 &&
        (productosDB = [...productosDB, ...adaptadorDB]);
    } catch (error) {
      console.log(error.message);
    }

    try {
      let auricularesDB = await Auricular.findAll({});
      auricularesDB.length !== 0 &&
        (productosDB = [...productosDB, ...auricularesDB]);
    } catch (error) {
      console.log(error.message);
    }

    try {
      let cablesDB = await Cable.findAll({});
      cablesDB.length !== 0 && (productosDB = [...productosDB, ...cablesDB]);
    } catch (error) {
      console.log(error.message);
    }

    try {
      let cargadoresDB = await Cargador.findAll({});
      cargadoresDB.length !== 0 &&
        (productosDB = [...productosDB, ...cargadoresDB]);
    } catch (error) {
      console.log(error.message);
    }

    try {
      let celularesDB = await Celular.findAll({});
      celularesDB.length !== 0 &&
        (productosDB = [...productosDB, ...celularesDB]);
    } catch (error) {
      console.log(error.message);
    }

    try {
      let computadorasDB = await Computadora.findAll({});
      computadorasDB.length !== 0 &&
        (productosDB = [...productosDB, ...computadorasDB]);
    } catch (error) {
      console.log(error.message);
    }

    try {
      let fuentesDB = await Fuente.findAll({});
      fuentesDB.length !== 0 && (productosDB = [...productosDB, ...fuentesDB]);
    } catch (error) {
      console.log(error.message);
    }

    try {
      let fundasDB = await Funda.findAll({});
      fundasDB.length !== 0 && (productosDB = [...productosDB, ...fundasDB]);
    } catch (error) {
      console.log(error.message);
    }

    try {
      let mallasDB = await Malla.findAll({});
      mallasDB.length !== 0 && (productosDB = [...productosDB, ...mallasDB]);
    } catch (error) {
      console.log(error.message);
    }

    try {
      let relojesDB = await Reloj.findAll({});
      relojesDB.length !== 0 && (productosDB = [...productosDB, ...relojesDB]);
    } catch (error) {
      console.log(error.message);
    }

    try {
      let tabletsDB = await Tablet.findAll({});
      tabletsDB.length !== 0 && (productosDB = [...productosDB, ...tabletsDB]);
    } catch (error) {
      console.log(error.message);
    }

    try {
      let vidriosDB = await Vidrio_Protector.findAll({});
      vidriosDB.length !== 0 && (productosDB = [...productosDB, ...vidriosDB]);
    } catch (error) {
      console.log(error.message);
    }

    res.status(200).send(productosDB);
  } catch (error) {
    console.log("No entro nunca");
    res.send("Error en la operacion: " + error.message);
  }
});

module.exports = router;
