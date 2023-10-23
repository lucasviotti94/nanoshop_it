const { Router } = require("express");
const { Op, Modelos } = require("../db.js");

const router = Router();

const { Cable } = Modelos;

router.get("/", async (req, res) => {
  try {
    let CablesDB = await Cable.findAll({});

    res.status(200).send(CablesDB);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cableByID = await Cable.findOne({ where: { id: id } });
    res.send(cableByID).status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.post("/", async (req, res, next) => {
  const { marca, modelo, ficha, largo, precio, color, informacion } = req.body;

  try {
    let cableNuevo = await Cable.create({
      marca: marca,
      modelo: modelo,
      ficha: ficha,
      largo: largo,
      precio: precio,
      color: color,
      informacion: informacion,
    });

    res.status(200).send(cableNuevo);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.put("/", async (req, res, next) => {
  const { id, marca, modelo, ficha, largo, precio, color, informacion } =
    req.body;

  try {
    const cableByIdDB = await Cable.findOne({ where: { id: id } });

    if (marca) {
      await cableByIdDB.update({ marca: marca });
    }
    if (modelo) {
      await cableByIdDB.update({ modelo: modelo });
    }
    if (ficha) {
      await cableByIdDB.update({ ficha: ficha });
    }
    if (largo) {
      await cableByIdDB.update({ largo: largo });
    }
    if (precio) {
      await cableByIdDB.update({ precio: precio });
    }
    if (color) {
      await cableByIdDB.update({ color: color });
    }
    if (informacion) {
      await cableByIdDB.update({ informacion: informacion });
    }
    res.status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Cable.destroy({
      where: {
        id: id,
      },
    });
    res.send("Cable borrado de la base de datos.").status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

module.exports = router;
