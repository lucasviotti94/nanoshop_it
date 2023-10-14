const { Router } = require("express");
const { Op, Modelos } = require("../db.js");

const router = Router();

const { Malla } = Modelos;

router.get("/", async (req, res) => {
  try {
    let mallasDB = await Malla.findAll({});

    res.status(200).send(mallasDB);
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.post("/", async (req, res, next) => {
  const { marca, color, precio, informacion } = req.body;

  try {
    let mallaNueva = await Malla.create({
      marca: marca,
      color: color,
      precio: precio,
      informacion: informacion,
    });

    res.status(200).send(mallaNueva);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(400);
  }
});

module.exports = router;
