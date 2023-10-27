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
  ModelosDD,
} = Modelos;

router.get("/", async (req, res) => {
  try {
    //Itero sobre los medelos extraidos de la DB y los comparo con los modelos seleccionados por preferencia (por el cliente) para corroborar que existan
    // y los reto rno al front para usarlos en los DropDown y hacerlo self-updatable

    const modelosSeleccionados = []; //Modelos elegidos por el cliente para mostrar
    const modelos = {
      // Todos los modelos existentes en la DB sin repetir
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

    let modelosSeleccionadosDB = await ModelosDD.findAll({});
    modelosSeleccionadosDB.map((element) => {
      modelosSeleccionados.push(element.dataValues.nombre);
    });

    try {
      let adaptadoresDB = await Adaptador.findAll({});
      adaptadoresDB.map(
        (adaptador) =>
          !modelos.Adaptadores.includes(adaptador.dataValues.modelo) &&
          modelosSeleccionados.includes(adaptador.dataValues.modelo) &&
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
          modelosSeleccionados.includes(auricular.dataValues.modelo) &&
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
          modelosSeleccionados.includes(cable.dataValues.modelo) &&
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
          modelosSeleccionados.includes(cargador.dataValues.modelo) &&
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
          modelosSeleccionados.includes(celular.dataValues.modelo) &&
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
          modelosSeleccionados.includes(computadora.dataValues.modelo) &&
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
          modelosSeleccionados.includes(fuente.dataValues.modelo) &&
          modelos.Fuentes.push(fuente.dataValues.modelo)
      );
    } catch (error) {
      console.log("Error en la operacion: " + error.message);
    }
    try {
      let fundasDB = await Funda.findAll({});
      fundasDB.map(
        (funda) =>
          !modelos.Fundas.includes(fuenda.dataValues.modelo) &&
          modelosSeleccionados.includes(funda.dataValues.modelo) &&
          modelos.Fundas.push(funda.dataValues.modelo)
      );
    } catch (error) {
      console.log("Error en la operacion: " + error.message);
    }
    try {
      let mallasDB = await Malla.findAll({});
      mallasDB.map(
        (malla) =>
          !modelos.Mallas.includes(malla.dataValues.modelo) &&
          modelosSeleccionados.includes(malla.dataValues.modelo) &&
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
          modelosSeleccionados.includes(reloj.dataValues.modelo) &&
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
          modelosSeleccionados.includes(tablet.dataValues.modelo) &&
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
          modelosSeleccionados.includes(vidrio.dataValues.modelo) &&
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

router.post("/", async (req, res, next) => {
  const { nombre, producto } = req.body;

  try {
    let modeloNuevo = await ModelosDD.create({
      nombre: nombre,
    });
    res.status(200).send(modeloNuevo);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await ModelosDD.destroy({
      where: {
        id: id,
      },
    });
    res.send("Modelo borrado de la base de datos.").status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

module.exports = router;
