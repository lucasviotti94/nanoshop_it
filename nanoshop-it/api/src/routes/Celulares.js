const { Router } = require("express");
const { Op, Modelos } = require("../db.js");

const router = Router();

const { Celular } = Modelos;

router.get("/", async (req, res) => {
  try {
    let celularesDB = await Celular.findAll({});

    res.status(200).send(celularesDB);
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.post("/", async (req, res, next) => {
  const {
    marca,
    modelo,
    almacenamiemto,
    color,
    estado,
    bateria,
    precio,
    informacion,
  } = req.body;

  try {
    let celularNuevo = await Celular.create({
      marca: marca,
      modelo: modelo,
      almacenamiemto: almacenamiemto,
      color: color,
      estado: estado,
      bateria: bateria,
      precio: precio,
      informacion: informacion,
    });

    res.status(200).send(celularNuevo);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(400);
  }
});

module.exports = router;
