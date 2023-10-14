const { Router } = require("express");
const { Op, Modelos } = require("../db.js");

const router = Router();

const { Reloj } = Modelos;

router.get("/", async (req, res) => {
  try {
    let relojesDB = await Reloj.findAll({});

    res.status(200).send(relojesDB);
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.post("/", async (req, res, next) => {
  const { marca, modelo, color, precio, informacion } = req.body;

  try {
    let relojNuevo = await Reloj.create({
      marca: marca,
      modelo: modelo,
      color: color,
      precio: precio,
      informacion: informacion,
    });

    res.status(200).send(relojNuevo);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(400);
  }
});

module.exports = router;
