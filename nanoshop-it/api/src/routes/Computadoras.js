const { Router } = require("express");
const { Op, Modelos } = require("../db.js");

const router = Router();

const { Computadora } = Modelos;

router.get("/", async (req, res) => {
  try {
    let computadorasDB = await Computadora.findAll({});

    res.status(200).send(computadorasDB);
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.post("/", async (req, res, next) => {
  const {
    marca,
    modelo,
    memoria,
    almacenamiemto,
    pantalla,
    color,
    chip,
    estado,
    precio,
    informacion,
  } = req.body;

  try {
    let computadoraNueva = await Computadora.create({
      marca: marca,
      modelo: modelo,
      memoria: memoria,
      almacenamiemto: almacenamiemto,
      pantalla: pantalla,
      color: color,
      chip: chip,
      estado: estado,
      precio: precio,
      informacion: informacion,
    });

    res.status(200).send(computadoraNueva);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(400);
  }
});

module.exports = router;
