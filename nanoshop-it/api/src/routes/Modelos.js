const { Router } = require("express");
const { Op, Modelos } = require("../db.js"); //IMPORTAR MODELOS ACA

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
    const modelos = {
      Adaptadores: [],
      Auriculares: [],
      Cables: [],
      Cargadores: [],
      Celulares: [],
      Computadoras: [],
      Fuentes: [],
      Fundas: [],
      Mallas: [],
      Relojes: [],
      Tablets: [],
      VidriosProtectores: [],
    };

    try {
      let adaptadoresDB = await Adaptador.findAll({});
      adaptadoresDB.map(
        (adaptador) =>
          !modelos.Adaptadores.includes(adaptador.dataValues.modelo) &&
          modelos.Adaptadores.push(adaptador.dataValues.modelo)
      );
    } catch (error) {
      console.log("Error en la operacion: " + error.message);
    }
    try {
      let auricularesDB = await Auricular.findAll({});
      auricularesDB.map(
        (auricular) =>
          !modelos.Auriculares.includes(auricular.dataValues.modelo) &&
          modelos.Auriculares.push(auricular.dataValues.modelo)
      );
    } catch (error) {
      console.log("Error en la operacion: " + error.message);
    }
    try {
      let cablesDB = await Cable.findAll({});
      cablesDB.map(
        (cable) =>
          !modelos.Cables.includes(cable.dataValues.modelo) &&
          modelos.Cables.push(cable.dataValues.modelo)
      );
    } catch (error) {
      console.log("Error en la operacion: " + error.message);
    }
    try {
      let cargadoresDB = await Cargador.findAll({});
      cargadoresDB.map(
        (cargador) =>
          !modelos.Cargadores.includes(cargador.dataValues.modelo) &&
          modelos.Cargadores.push(cargador.dataValues.modelo)
      );
    } catch (error) {
      console.log("Error en la operacion: " + error.message);
    }
    try {
      let celularesDB = await Celular.findAll({});
      celularesDB.map(
        (celular) =>
          !modelos.Celulares.includes(celular.dataValues.modelo) &&
          modelos.Celulares.push(celular.dataValues.modelo)
      );
    } catch (error) {
      console.log("Error en la operacion: " + error.message);
    }
    try {
      let computadorasDB = await Computadora.findAll({});
      computadorasDB.map(
        (computadora) =>
          !modelos.Computadoras.includes(computadora.dataValues.modelo) &&
          modelos.Computadoras.push(computadora.dataValues.modelo)
      );
    } catch (error) {
      console.log("Error en la operacion: " + error.message);
    }
    try {
      let fuentesDB = await Fuente.findAll({});
      fuentesDB.map(
        (fuente) =>
          !modelos.Fuentes.includes(fuente.dataValues.modelo) &&
          modelos.Fuentes.push(fuente.dataValues.modelo)
      );
    } catch (error) {
      console.log("Error en la operacion: " + error.message);
    }
    try {
      let fundasDB = await Funda.findAll({});
      fundasDB.map(
        (fuenda) =>
          !modelos.Fundas.includes(fuenda.dataValues.modelo) &&
          modelos.Fundas.push(fuenda.dataValues.modelo)
      );
    } catch (error) {
      console.log("Error en la operacion: " + error.message);
    }
    try {
      let mallasDB = await Malla.findAll({});
      mallasDB.map(
        (malla) =>
          !modelos.Mallas.includes(malla.dataValues.modelo) &&
          modelos.Mallas.push(malla.dataValues.modelo)
      );
    } catch (error) {
      console.log("Error en la operacion: " + error.message);
    }
    try {
      let relojesDB = await Reloj.findAll({});
      relojesDB.map(
        (reloj) =>
          !modelos.Relojes.includes(reloj.dataValues.modelo) &&
          modelos.Relojes.push(reloj.dataValues.modelo)
      );
    } catch (error) {
      console.log("Error en la operacion: " + error.message);
    }
    try {
      let tabletsDB = await Tablet.findAll({});
      tabletsDB.map(
        (tablet) =>
          !modelos.Tablets.includes(tablet.dataValues.modelo) &&
          modelos.Tablets.push(tablet.dataValues.modelo)
      );
    } catch (error) {
      console.log("Error en la operacion: " + error.message);
    }
    try {
      let vidriosProtectoresDB = await Vidrio_Protector.findAll({});
      vidriosProtectoresDB.map(
        (vidrio) =>
          !modelos.VidriosProtectores.includes(vidrio.dataValues.modelo) &&
          modelos.VidriosProtectores.push(vidrio.dataValues.modelo)
      );
    } catch (error) {
      console.log("Error en la operacion: " + error.message);
    }

    res.status(200).send(modelos);
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

module.exports = router;
