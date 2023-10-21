const { Router } = require("express");
const { Op, Modelos } = require("../db.js");

const router = Router();

const { Celular } = Modelos;

router.get("/", async (req, res) => {
  try {
    let celularesDB = await Celular.findAll({});

    res.status(200).send(celularesDB);
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.post("/", async (req, res, next) => {
  const {
    marca,
    modelo,
    almacenamiemto,
    color,
    estado,
    bateria,
    precio,
    informacion,
  } = req.body;

  try {
    let celularNuevo = await Celular.create({
      marca: marca,
      modelo: modelo,
      almacenamiemto: almacenamiemto,
      color: color,
      estado: estado,
      bateria: bateria,
      precio: precio,
      informacion: informacion,
    });

    res.status(200).send(celularNuevo);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(400);
  }
});

router.put("/:id", async (req, res, next) => {
  const {
    id,
    marca,
    modelo,
    almacenamiemto,
    color,
    estado,
    bateria,
    precio,
    informacion,
  } = req.body;

  try {
    const celularByIdDB = await Celular.findOne({ where: { ID: id } });

    if (marca) {
      await celularByIdDB.update({ marca: marca });
    }
    if (modelo) {
      await celularByIdDB.update({ modelo: modelo });
    }
    if (almacenamiemto) {
      await celularByIdDB.update({ almacenamiemto: almacenamiemto });
    }
    if (color) {
      await celularByIdDB.update({ color: color });
    }
    if (estado) {
      await celularByIdDB.update({ estado: estado });
    }
    if (bateria) {
      await celularByIdDB.update({ bateria: bateria });
    }
    if (precio) {
      await celularByIdDB.update({ precio: precio });
    }
    if (informacion) {
      await celularByIdDB.update({ informacion: informacion });
    }
    res.status(200);
  } catch (error) {
    res.status(500).send("entro al catch");
  }
});

module.exports = router;
