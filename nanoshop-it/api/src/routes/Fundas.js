const { Router } = require("express");
const { Op, Modelos } = require("../db.js");

const router = Router();

const { Funda } = Modelos;

router.get("/", async (req, res) => {
  try {
    let fundasDB = await Funda.findAll({});

    res.status(200).send(fundasDB);
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.post("/", async (req, res, next) => {
  const { marca, tipo, color, precio, informacion } = req.body;

  try {
    let fuenteNueva = await Funda.create({
      marca: marca,
      tipo: tipo,
      color: color,
      precio: precio,
      informacion: informacion,
    });

    res.status(200).send(fuenteNueva);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(400);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id, marca, tipo, color, precio, informacion } = req.body;

  try {
    const fundaByIdDB = await Funda.findOne({ where: { ID: id } });

    if (marca) {
      await fundaByIdDB.update({ marca: marca });
    }
    if (tipo) {
      await fundaByIdDB.update({ tipo: tipo });
    }
    if (color) {
      await fundaByIdDB.update({ color: color });
    }
    if (precio) {
      await fundaByIdDB.update({ precio: precio });
    }
    if (informacion) {
      await fundaByIdDB.update({ informacion: informacion });
    }
    res.status(200);
  } catch (error) {
    res.status(500).send("entro al catch");
  }
});

module.exports = router;
