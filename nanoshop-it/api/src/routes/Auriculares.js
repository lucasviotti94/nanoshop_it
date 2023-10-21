const { Router } = require("express");
const { Op, Modelos } = require("../db.js"); //IMPORTAR MODELOS ACA

const router = Router();

const { Auricular } = Modelos;

router.get("/", async (req, res) => {
  try {
    let auricularesDB = await Auricular.findAll({});

    res.status(200).send(auricularesDB);
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.post("/", async (req, res, next) => {
  const { marca, modelo, ficha, inalambrico, precio, color, informacion } =
    req.body;

  try {
    let auricularNuevo = await Auricular.create({
      marca: marca,
      modelo: modelo,
      ficha: ficha,
      inalambrico: inalambrico,
      precio: precio,
      color: color,
      informacion: informacion,
    });

    res.status(200).send(auricularNuevo);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(400);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id, marca, modelo, ficha, inalambrico, precio, color, informacion } =
    req.body;

  try {
    const auricularByIdDB = await Auricular.findOne({ where: { ID: id } });

    if (marca) {
      await auricularByIdDB.update({ marca: marca });
    }
    if (modelo) {
      await auricularByIdDB.update({ modelo: modelo });
    }
    if (ficha) {
      await auricularByIdDB.update({ ficha: ficha });
    }
    if (inalambrico) {
      await auricularByIdDB.update({ inalambrico: inalambrico });
    }
    if (precio) {
      await auricularByIdDB.update({ precio: precio });
    }
    if (color) {
      await auricularByIdDB.update({ color: color });
    }
    if (informacion) {
      await auricularByIdDB.update({ informacion: informacion });
    }
    res.status(200);
  } catch (error) {
    res.status(500).send("entro al catch");
  }
});

module.exports = router;
