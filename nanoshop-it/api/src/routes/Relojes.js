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

router.put("/:id", async (req, res, next) => {
  const { id, marca, modelo, color, precio, informacion } = req.body;

  try {
    const relojByIdDB = await Reloj.findOne({ where: { ID: id } });

    if (marca) {
      await relojByIdDB.update({ marca: marca });
    }
    if (modelo) {
      await relojByIdDB.update({ modelo: modelo });
    }
    if (color) {
      await relojByIdDB.update({ color: color });
    }
    if (precio) {
      await relojByIdDB.update({ precio: precio });
    }
    if (informacion) {
      await relojByIdDB.update({ informacion: informacion });
    }
    res.status(200);
  } catch (error) {
    res.status(500).send("entro al catch");
  }
});

module.exports = router;
