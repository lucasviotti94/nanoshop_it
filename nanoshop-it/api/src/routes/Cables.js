const { Router } = require("express");
const { Op, Modelos } = require("../db.js");

const router = Router();

const { Cable } = Modelos;

router.get("/", async (req, res) => {
  try {
    let CablesDB = await Cable.findAll({});

    res.status(200).send(CablesDB);
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.post("/", async (req, res, next) => {
  const { marca, modelo, ficha, largo, precio, color, informacion } = req.body;

  try {
    let cableNuevo = await Cable.create({
      marca: marca,
      modelo: modelo,
      ficha: ficha,
      largo: largo,
      precio: precio,
      color: color,
      informacion: informacion,
    });

    res.status(200).send(cableNuevo);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(400);
  }
});

module.exports = router;
