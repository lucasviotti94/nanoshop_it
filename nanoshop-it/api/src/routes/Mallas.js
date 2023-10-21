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

router.put("/:id", async (req, res, next) => {
  const { id, marca, color, precio, informacion } = req.body;

  try {
    const mallaByIdDB = await Malla.findOne({ where: { ID: id } });

    if (marca) {
      await mallaByIdDB.update({ marca: marca });
    }
    if (color) {
      await mallaByIdDB.update({ color: color });
    }
    if (precio) {
      await mallaByIdDB.update({ precio: precio });
    }
    if (informacion) {
      await mallaByIdDB.update({ informacion: informacion });
    }
    res.status(200);
  } catch (error) {
    res.status(500).send("entro al catch");
  }
});

module.exports = router;
