const { Router } = require("express");
const { Op, Modelos } = require("../db.js"); //IMPORTAR MODELOS ACA

const router = Router();

const { Adaptador } = Modelos;

router.get("/", async (req, res) => {
  try {
    let adaptadoresDB = await Adaptador.findAll({});

    res.status(200).send(adaptadoresDB);
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.post("/", async (req, res, next) => {
  const { marca, modelo, tipo, precio, informacion } = req.body;

  try {
    let adaptadorNuevo = await Adaptador.create({
      marca: marca,
      modelo: modelo,
      tipo: tipo,
      precio: precio,
      informacion: informacion,
    });

    res.status(200).send(adaptadorNuevo); // para agarrar el id de usuario al crearlo
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(400);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id, marca, modelo, tipo, precio, informacion } = req.body;

  try {
    const adaptador = await Adaptador.findOne({ where: { ID: id } });

    if (marca) {
      await adaptador.update({ marca: marca });
    }
    if (modelo) {
      await adaptador.update({ modelo: modelo });
    }
    if (tipo) {
      await adaptador.update({ tipo: tipo });
    }
    if (precio) {
      await adaptador.update({ precio: precio });
    }
    if (informacion) {
      await adaptador.update({ informacion: informacion });
    }
  } catch (error) {
    res.status(500).send("entro al catch");
  }
});

module.exports = router;
