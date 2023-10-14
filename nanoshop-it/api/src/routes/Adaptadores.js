const { Router } = require("express");
const { Op, Modelos } = require("../db.js"); //IMPORTAR MODELOS ACA

const router = Router();

const { Adaptador } = Modelos;

router.get("/", async (req, res) => {
  try {
    let adaptadoresDB = await Adaptador.findAll({});

    res.status(200).send(adaptadoresDB);
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.post("/", async (req, res, next) => {
  const { marca, modelo, tipo, precio, informacion } = req.body;

  try {
    let adaptadorNuevo = await Adaptador.create({
      marca: marca,
      modelo: modelo,
      tipo: tipo,
      precio: precio,
      informacion: informacion,
    });

    res.status(200).send(adaptadorNuevo); // para agarrar el id de usuario al crearlo
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(400);
  }
});

module.exports = router;
