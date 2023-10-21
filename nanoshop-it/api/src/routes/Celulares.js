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
    const celular = await Celular.findOne({ where: { ID: id } });

    if (marca) {
      await celular.update({ marca: marca });
    }
    if (modelo) {
      await celular.update({ modelo: modelo });
    }
    if (almacenamiemto) {
      await celular.update({ almacenamiemto: almacenamiemto });
    }
    if (color) {
      await celular.update({ color: color });
    }
    if (estado) {
      await celular.update({ estado: estado });
    }
    if (bateria) {
      await celular.update({ bateria: bateria });
    }
    if (precio) {
      await celular.update({ precio: precio });
    }
    if (informacion) {
      await celular.update({ informacion: informacion });
    }
  } catch (error) {
    res.status(500).send("entro al catch");
  }
});

module.exports = router;
