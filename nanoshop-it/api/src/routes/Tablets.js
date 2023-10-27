const { Router } = require("express");
const { Op, Modelos } = require("../db.js");

const router = Router();

const { Tablet } = Modelos;

router.get("/", async (req, res) => {
  try {
    let tabletsDB = await Tablet.findAll({});

    res.status(200).send(tabletsDB);
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tabletByID = await Tablet.findOne({ where: { id: id } });
    res.send(tabletByID).status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.post("/", async (req, res, next) => {
  const {
    marca,
    modelo,
    color,
    pantalla,
    almacenamiento,
    precio,
    informacion,
  } = req.body;

  try {
    let tabletNueva = await Tablet.create({
      marca: marca,
      modelo: modelo,
      color: color,
      almacenamiento: almacenamiento,
      pantalla: pantalla,
      precio: precio,
      informacion: informacion,
    });

    res.status(200).send(tabletNueva);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.put("/", async (req, res, next) => {
  const {
    id,
    marca,
    modelo,
    color,
    tamaño,
    almacenamiento,
    precio,
    informacion,
  } = req.body;

  try {
    const tabletByIdDB = await Tablet.findOne({ where: { id: id } });

    if (marca) {
      await tabletByIdDB.update({ marca: marca });
    }
    if (modelo) {
      await tabletByIdDB.update({ modelo: modelo });
    }
    if (color) {
      await tabletByIdDB.update({ color: color });
    }
    if (tamaño) {
      await tabletByIdDB.update({ tamaño: tamaño });
    }
    if (almacenamiento) {
      await tabletByIdDB.update({ almacenamiento: almacenamiento });
    }
    if (precio) {
      await tabletByIdDB.update({ precio: precio });
    }
    if (informacion) {
      await tabletByIdDB.update({ informacion: informacion });
    }
    res.status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Tablet.destroy({
      where: {
        id: id,
      },
    });
    res.send("Tablet borrado de la base de datos.").status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

module.exports = router;
