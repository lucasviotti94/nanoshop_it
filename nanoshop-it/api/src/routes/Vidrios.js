const { Router } = require("express");
const { Op, Modelos } = require("../db.js");

const router = Router();

const { Vidrio } = Modelos;

router.get("/", async (req, res) => {
  try {
    let vidriosDB = await Vidrio.findAll({});

    res.status(200).send(vidriosDB);
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.post("/", async (req, res, next) => {
  const { marca, modelo, color, precio, informacion } = req.body;

  try {
    let vidrioNuevo = await Vidrio.create({
      marca: marca,
      modelo: modelo,
      color: color,
      precio: precio,
      informacion: informacion,
    });

    res.status(200).send(vidrioNuevo);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(400);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id, marca, modelo, color, precio, informacion } = req.body;

  try {
    const vidrioByIdDB = await Vidrio.findOne({ where: { ID: id } });

    if (marca) {
      await vidrioByIdDB.update({ marca: marca });
    }
    if (modelo) {
      await vidrioByIdDB.update({ modelo: modelo });
    }
    if (color) {
      await vidrioByIdDB.update({ color: color });
    }
    if (precio) {
      await vidrioByIdDB.update({ precio: precio });
    }
    if (informacion) {
      await vidrioByIdDB.update({ informacion: informacion });
    }
    res.status(200);
  } catch (error) {
    res.status(500).send("entro al catch");
  }
});

module.exports = router;
