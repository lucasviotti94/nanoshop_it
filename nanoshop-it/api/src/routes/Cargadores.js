const { Router } = require("express");
const { Op, Modelos } = require("../db.js");

const router = Router();

const { Cargador } = Modelos;

router.get("/", async (req, res) => {
  try {
    let CargadoresDB = await Cargador.findAll({});

    res.status(200).send(CargadoresDB);
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.post("/", async (req, res, next) => {
  const { marca, modelo, inalambrico, deAuto, precio, informacion } = req.body;

  try {
    let cargadorNuevo = await Cargador.create({
      marca: marca,
      modelo: modelo,
      inalambrico: inalambrico,
      deAuto: deAuto,
      precio: precio,
      informacion: informacion,
    });

    res.status(200).send(cargadorNuevo);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(400);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id, marca, modelo, inalambrico, deAuto, precio, informacion } =
    req.body;

  try {
    const cargador = await Cargador.findOne({ where: { ID: id } });

    if (marca) {
      await cargador.update({ marca: marca });
    }
    if (modelo) {
      await cargador.update({ modelo: modelo });
    }
    if (inalambrico) {
      await cargador.update({ inalambrico: inalambrico });
    }
    if (deAuto) {
      await cargador.update({ deAuto: deAuto });
    }
    if (precio) {
      await cargador.update({ precio: precio });
    }
    if (informacion) {
      await cargador.update({ informacion: informacion });
    }
  } catch (error) {
    res.status(500).send("entro al catch");
  }
});

module.exports = router;
