const { Router } = require("express");
const { Op, Modelos } = require("../db.js"); //IMPORTAR MODELOS ACA

const router = Router();

const { Auricular } = Modelos;

router.get("/", async (req, res) => {
  try {
    let auricularesDB = await Auricular.findAll({});

    res.status(200).send(auricularesDB);
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.post("/", async (req, res, next) => {
  const { marca, modelo, ficha, inalambrico, precio, color, informacion } =
    req.body;

  try {
    let auricularNuevo = await Auricular.create({
      marca: marca,
      modelo: modelo,
      ficha: ficha,
      inalambrico: inalambrico,
      precio: precio,
      color: color,
      informacion: informacion,
    });

    res.status(200).send(auricularNuevo);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(400);
  }
});

module.exports = router;
