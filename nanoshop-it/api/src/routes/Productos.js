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

router.get("/", async (req, res) => {
  try {
    var productosDB = [];

    try {
      let adaptadorDB = await Adaptador.findAll({});
      adaptadorDB.length !== 0
        ? (productosDB = [...productosDB, ...adaptadorDB])
        : (productosDB = [
            ...productosDB,
            { response: "No existen Adaptadores en la Base de Datos." },
          ]);
    } catch (error) {
      console.log(error.message);
    }

    try {
      let auricularesDB = await Auricular.findAll({});
      auricularesDB.length !== 0
        ? (productosDB = [...productosDB, ...auricularesDB])
        : (productosDB = [
            ...productosDB,
            { response: "No existen Auriculares en la Base de Datos." },
          ]);
    } catch (error) {
      console.log(error.message);
    }

    try {
      let cablesDB = await Cable.findAll({});
      cablesDB.length !== 0
        ? (productosDB = [...productosDB, ...cablesDB])
        : (productosDB = [
            ...productosDB,
            { response: "No existen Cables en la Base de Datos." },
          ]);
    } catch (error) {
      console.log(error.message);
    }

    try {
      let cargadoresDB = await Cargador.findAll({});
      cargadoresDB.length !== 0
        ? (productosDB = [...productosDB, ...cargadoresDB])
        : (productosDB = [
            ...productosDB,
            { response: "No existen Cargadores en la Base de Datos." },
          ]);
    } catch (error) {
      console.log(error.message);
    }

    try {
      let celularesDB = await Celular.findAll({});
      celularesDB.length !== 0
        ? (productosDB = [...productosDB, ...celularesDB])
        : (productosDB = [
            ...productosDB,
            { response: "No existen Celulares en la Base de Datos." },
          ]);
    } catch (error) {
      console.log(error.message);
    }

    try {
      let computadorasDB = await Computadora.findAll({});
      computadorasDB.length !== 0
        ? (productosDB = [...productosDB, ...computadorasDB])
        : (productosDB = [
            ...productosDB,
            { response: "No existen Computadoras en la Base de Datos." },
          ]);
    } catch (error) {
      console.log(error.message);
    }

    try {
      let fuentesDB = await Fuente.findAll({});
      fuentesDB.length !== 0
        ? (productosDB = [...productosDB, ...fuentesDB])
        : (productosDB = [
            ...productosDB,
            { response: "No existen Fuente en la Base de Datos." },
          ]);
    } catch (error) {
      console.log(error.message);
    }

    try {
      let fundasDB = await Funda.findAll({});
      fundasDB.length !== 0
        ? (productosDB = [...productosDB, ...fundasDB])
        : (productosDB = [
            ...productosDB,
            { response: "No existen Fundas en la Base de Datos." },
          ]);
    } catch (error) {
      console.log(error.message);
    }

    try {
      let mallasDB = await Malla.findAll({});
      mallasDB.length !== 0
        ? (productosDB = [...productosDB, ...mallasDB])
        : (productosDB = [
            ...productosDB,
            { response: "No existen Mallas en la Base de Datos." },
          ]);
    } catch (error) {
      console.log(error.message);
    }

    try {
      let relojesDB = await Reloj.findAll({});
      relojesDB.length !== 0
        ? (productosDB = [...productosDB, ...relojesDB])
        : (productosDB = [
            ...productosDB,
            { response: "No existen Relojes en la Base de Datos." },
          ]);
    } catch (error) {
      console.log(error.message);
    }

    try {
      let tabletsDB = await Tablet.findAll({});
      tabletsDB.length !== 0
        ? (productosDB = [...productosDB, ...tabletsDB])
        : (productosDB = [
            ...productosDB,
            { response: "No existen Tablets en la Base de Datos." },
          ]);
    } catch (error) {
      console.log(error.message);
    }

    try {
      let vidriosDB = await Vidrio_Protector.findAll({});
      vidriosDB.length !== 0
        ? (productosDB = [...productosDB, ...vidriosDB])
        : (productosDB = [
            ...productosDB,
            { response: "No existen Vidrios en la Base de Datos." },
          ]);
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
