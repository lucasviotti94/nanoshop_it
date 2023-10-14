const { Router } = require("express");
const { Op, Modelos } = require("../db.js");

const router = Router();

const { Tablet } = Modelos;

router.get("/", async (req, res) => {
  try {
    let tabletsDB = await Tablet.findAll({});

    res.status(200).send(tabletsDB);
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.post("/", async (req, res, next) => {
  const { marca, modelo, color, tamaño, almacenamiento, precio, informacion } =
    req.body;

  try {
    let tabletNueva = await Tablet.create({
      marca: marca,
      modelo: modelo,
      color: color,
      tamaño: tamaño,
      almacenamiento: almacenamiento,
      precio: precio,
      informacion: informacion,
    });

    res.status(200).send(tabletNueva);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(400);
  }
});

module.exports = router;
