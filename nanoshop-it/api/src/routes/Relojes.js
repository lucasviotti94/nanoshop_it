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

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const relojByID = await Reloj.findOne({ where: { id: id } });
    res.send(relojByID).status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
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
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.put("/", async (req, res, next) => {
  const { id, marca, modelo, color, precio, informacion } = req.body;

  try {
    const relojByIdDB = await Reloj.findOne({ where: { id: id } });

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
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Reloj.destroy({
      where: {
        id: id,
      },
    });
    res.send("Reloj borrado de la base de datos.").status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

module.exports = router;
