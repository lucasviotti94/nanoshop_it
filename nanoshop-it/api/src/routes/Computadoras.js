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
    res.send("Error en la operacion: " + error.message).status(400);
  }
});

router.put("/:id", async (req, res, next) => {
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
    const celular = await Celular.findOne({ where: { ID: id } });

    if (marca) {
      await celular.update({ marca: marca });
    }
    if (modelo) {
      await celular.update({ modelo: modelo });
    }
    if (memoria) {
      await celular.update({ memoria: memoria });
    }
    if (almacenamiemto) {
      await celular.update({ almacenamiemto: almacenamiemto });
    }
    if (pantalla) {
      await celular.update({ pantalla: pantalla });
    }
    if (color) {
      await celular.update({ color: color });
    }
    if (chip) {
      await celular.update({ chip: chip });
    }
    if (estado) {
      await celular.update({ estado: estado });
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
