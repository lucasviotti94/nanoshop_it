const { Router } = require("express");
const { Op, Modelos } = require("../db.js"); //IMPORTAR MODELOS ACA

const router = Router();

const { Adaptador } = Modelos;

router.get("/", async (req, res) => {
  try {
    const adaptadoresDB = await Adaptador.findAll({});
    res.status(200).send(adaptadoresDB);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const adaptadorByID = await Adaptador.findOne({ where: { id: id } });
    res.status(200).send(adaptadorByID);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.post("/", async (req, res, next) => {
  const { marca, modelo, tipo, estado, precio, informacion } = req.body;

  try {
    let adaptadorNuevo = await Adaptador.create({
      marca: marca,
      modelo: modelo,
      estado: estado,
      tipo: tipo,
      precio: precio,
      informacion: informacion,
    });
    res.send(adaptadorNuevo).status(200); // para agarrar el id de usuario al crearlo
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.put("/", async (req, res, next) => {
  const { id, marca, modelo, tipo, estado, precio, informacion } = req.body;

  try {
    const adaptadorByIdDB = await Adaptador.findOne({ where: { id: id } });

    if (marca) {
      await adaptadorByIdDB.update({ marca: marca });
    }
    if (modelo) {
      await adaptadorByIdDB.update({ modelo: modelo });
    }
    if (tipo) {
      await adaptadorByIdDB.update({ tipo: tipo });
    }
    if (estado) {
      await adaptadorByIdDB.update({ estado: estado });
    }
    if (precio) {
      await adaptadorByIdDB.update({ precio: precio });
    }
    if (informacion) {
      await adaptadorByIdDB.update({ informacion: informacion });
    }
    res.status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Adaptador.destroy({
      where: {
        id: id,
      },
    });
    res.send("Adaptador borrado de la base de datos.").status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

module.exports = router;
