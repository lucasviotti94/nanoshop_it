const { Router } = require("express");
const { Op, Modelos } = require("../db.js");

const router = Router();

const { Fuente } = Modelos;

router.get("/", async (req, res) => {
  try {
    let fuentesDB = await Fuente.findAll({});

    res.status(200).send(fuentesDB);
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.post("/", async (req, res, next) => {
  const { marca, tipo, precio, informacion } = req.body;

  try {
    let fuenteNueva = await Fuente.create({
      marca: marca,
      tipo: tipo,
      precio: precio,
      informacion: informacion,
    });

    res.status(200).send(fuenteNueva);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(400);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id, marca, tipo, precio, informacion } = req.body;

  try {
    const fuenteByIdDB = await Fuente.findOne({ where: { ID: id } });

    if (marca) {
      await fuenteByIdDB.update({ marca: marca });
    }
    if (tipo) {
      await fuenteByIdDB.update({ tipo: tipo });
    }
    if (precio) {
      await fuenteByIdDB.update({ precio: precio });
    }
    if (informacion) {
      await fuenteByIdDB.update({ informacion: informacion });
    }
    res.status(200);
  } catch (error) {
    res.status(500).send("entro al catch");
  }
});

module.exports = router;
