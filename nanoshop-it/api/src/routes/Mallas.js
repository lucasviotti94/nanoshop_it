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

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const mallaByID = await Malla.findOne({ where: { id: id } });
    res.send(mallaByID).status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.post("/", async (req, res, next) => {
  const { marca, modelo, color, precio, informacion } = req.body;

  try {
    let mallaNueva = await Malla.create({
      marca: marca,
      modelo: modelo,
      color: color,
      precio: precio,
      informacion: informacion,
    });

    res.status(200).send(mallaNueva);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.put("/", async (req, res, next) => {
  const { id, marca, modelo, color, precio, informacion } = req.body;

  try {
    const mallaByIdDB = await Malla.findOne({ where: { id: id } });

    if (marca) {
      await mallaByIdDB.update({ marca: marca });
    }
    if (modelo) {
      await mallaByIdDB.update({ modelo: modelo });
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

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Malla.destroy({
      where: {
        id: id,
      },
    });
    res.send("Malla borrado de la base de datos.").status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

module.exports = router;
