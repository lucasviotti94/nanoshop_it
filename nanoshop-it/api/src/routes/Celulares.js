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

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const celularByID = await Celular.findOne({ where: { id: id } });
    res.send(celularByID).status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.post("/", async (req, res, next) => {
  const {
    marca,
    modelo,
    almacenamiento,
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
      almacenamiento: almacenamiento,
      color: color,
      estado: estado,
      bateria: bateria,
      precio: precio,
      informacion: informacion,
    });

    res.status(200).send(celularNuevo);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.put("/", async (req, res, next) => {
  const {
    id,
    marca,
    modelo,
    almacenamiento,
    color,
    estado,
    bateria,
    precio,
    informacion,
  } = req.body;

  try {
    const celularByIdDB = await Celular.findOne({ where: { id: id } });

    if (marca) {
      await celularByIdDB.update({ marca: marca });
    }
    if (modelo) {
      await celularByIdDB.update({ modelo: modelo });
    }
    if (almacenamiento) {
      await celularByIdDB.update({ almacenamiento: almacenamiento });
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
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Celular.destroy({
      where: {
        id: id,
      },
    });
    res.send("Celular borrado de la base de datos.").status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

module.exports = router;
