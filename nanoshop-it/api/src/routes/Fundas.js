const { Router } = require("express");
const { Op, Modelos } = require("../db.js");

const router = Router();

const { Funda } = Modelos;

router.get("/", async (req, res) => {
  try {
    let fundasDB = await Funda.findAll({});

    res.status(200).send(fundasDB);
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const fundaByID = await Funda.findOne({ where: { id: id } });
    res.send(fundaByID).status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.post("/", async (req, res, next) => {
  const { marca, modelo, tipo, color, precio, informacion } = req.body;

  try {
    let fuenteNueva = await Funda.create({
      marca: marca,
      modelo: modelo,
      tipo: tipo,
      color: color,
      precio: precio,
      informacion: informacion,
    });

    res.status(200).send(fuenteNueva);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.put("/", async (req, res, next) => {
  const { id, marca, modelo, tipo, color, precio, informacion } = req.body;

  try {
    const fundaByIdDB = await Funda.findOne({ where: { id: id } });

    if (marca) {
      await fundaByIdDB.update({ marca: marca });
    }
    if (modelo) {
      await fundaByIdDB.update({ modelo: modelo });
    }
    if (tipo) {
      await fundaByIdDB.update({ tipo: tipo });
    }
    if (color) {
      await fundaByIdDB.update({ color: color });
    }
    if (precio) {
      await fundaByIdDB.update({ precio: precio });
    }
    if (informacion) {
      await fundaByIdDB.update({ informacion: informacion });
    }
    res.status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Funda.destroy({
      where: {
        id: id,
      },
    });
    res.send("Funda borrado de la base de datos.").status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

module.exports = router;
