const { Router } = require("express");
const { Op, Modelos } = require("../db.js");

const router = Router();

const { Computadora } = Modelos;

router.get("/", async (req, res) => {
  try {
    let computadorasDB = await Computadora.findAll({});

    res.status(200).send(computadorasDB);
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const computadoraByID = await Computadora.findOne({ where: { id: id } });
    res.send(computadoraByID).status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.post("/", async (req, res, next) => {
  const {
    marca,
    modelo,
    memoria,
    almacenamiemto,
    pantalla,
    color,
    chip,
    estado,
    precio,
    informacion,
  } = req.body;

  try {
    let computadoraNueva = await Computadora.create({
      marca: marca,
      modelo: modelo,
      memoria: memoria,
      almacenamiemto: almacenamiemto,
      pantalla: pantalla,
      color: color,
      chip: chip,
      estado: estado,
      precio: precio,
      informacion: informacion,
    });

    res.status(200).send(computadoraNueva);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.put("/", async (req, res, next) => {
  const {
    id,
    marca,
    modelo,
    memoria,
    almacenamiemto,
    pantalla,
    color,
    chip,
    estado,
    precio,
    informacion,
  } = req.body;

  try {
    const computadoraByIdDB = await Computadora.findOne({ where: { id: id } });

    if (marca) {
      await computadoraByIdDB.update({ marca: marca });
    }
    if (modelo) {
      await computadoraByIdDB.update({ modelo: modelo });
    }
    if (memoria) {
      await computadoraByIdDB.update({ memoria: memoria });
    }
    if (almacenamiemto) {
      await computadoraByIdDB.update({ almacenamiemto: almacenamiemto });
    }
    if (pantalla) {
      await computadoraByIdDB.update({ pantalla: pantalla });
    }
    if (color) {
      await computadoraByIdDB.update({ color: color });
    }
    if (chip) {
      await computadoraByIdDB.update({ chip: chip });
    }
    if (estado) {
      await computadoraByIdDB.update({ estado: estado });
    }
    if (precio) {
      await computadoraByIdDB.update({ precio: precio });
    }
    if (informacion) {
      await computadoraByIdDB.update({ informacion: informacion });
    }
    res.status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Computadora.destroy({
      where: {
        id: id,
      },
    });
    res.send("Computadora borrado de la base de datos.").status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

module.exports = router;
