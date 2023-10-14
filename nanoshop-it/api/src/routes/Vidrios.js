const { Router } = require("express");
const { Op, Modelos } = require("../db.js");

const router = Router();

const { Vidrio } = Modelos;

router.get("/", async (req, res) => {
  try {
    let vidriosDB = await Vidrio.findAll({});

    res.status(200).send(vidriosDB);
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.post("/", async (req, res, next) => {
  const { marca, modelo, color, precio, informacion } = req.body;

  try {
    let vidrioNuevo = await Vidrio.create({
      marca: marca,
      modelo: modelo,
      color: color,
      precio: precio,
      informacion: informacion,
    });

    res.status(200).send(vidrioNuevo);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(400);
  }
});

module.exports = router;
