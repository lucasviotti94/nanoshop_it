const { Router } = require("express");
const { Op, Modelos } = require("../db.js");

const router = Router();

const { Vidrio_Protector } = Modelos;

router.get("/", async (req, res) => {
  try {
    let vidriosDB = await Vidrio_Protector.findAll({});

    res.status(200).send(vidriosDB);
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const vidrioProtectorByID = await Vidrio_Protector.findOne({
      where: { id: id },
    });
    res.send(vidrioProtectorByID).status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.post("/", async (req, res, next) => {
  const { marca, modelo, color, precio, informacion } = req.body;

  try {
    let vidrioNuevo = await Vidrio_Protector.create({
      marca: marca,
      modelo: modelo,
      color: color,
      precio: precio,
      informacion: informacion,
    });

    res.status(200).send(vidrioNuevo);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.put("/", async (req, res, next) => {
  const { id, marca, modelo, color, precio, informacion } = req.body;
  try {
    const vidrioByIdDB = await Vidrio_Protector.findOne({ where: { id: id } });
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
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Vidrio_Protector.destroy({
      where: {
        id: id,
      },
    });
    res.send("Vidrio borrado de la base de datos.").status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

module.exports = router;
