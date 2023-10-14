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

module.exports = router;
