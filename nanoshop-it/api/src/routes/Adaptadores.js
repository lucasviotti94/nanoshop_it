const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const { Op, Modelos } = require("../db.js");
const { Adaptador, Conjunto } = Modelos;

const router = Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });

router.post("/", upload.array("file"), async (req, res, next) => {
  const { marca, modelo, tipo, estado, color, precio, cantidad, informacion } =
    req.body;
  try {
    if (cantidad >= 2) {
      const conjunto = await Conjunto.create({
        producto: "Adaptador",
        marca: marca,
        modelo: modelo,
        cantidad: cantidad,
        precio: precio,
      });
      var coloresArray = [...color.split(",")];
      for (let i = 0; i < cantidad; i++) {
        const coloriterado = coloresArray[i];
        let adaptadorNuevo = await Adaptador.create({
          marca: marca,
          modelo: modelo,
          estado: estado,
          color: [coloriterado],
          tipo: tipo,
          precio: precio,
          informacion: informacion,
          imagenUbicacion:
            typeof req.files === "object" &&
            req.files.map((imagen) => {
              return imagen.filename;
            }),
        });
        conjunto.addAdaptador(adaptadorNuevo);
      }
      res.status(200).json({ conjunto });
    } else {
      let adaptadorNuevo = await Adaptador.create({
        marca: marca,
        modelo: modelo,
        estado: estado,
        color: [color],
        tipo: tipo,
        precio: precio,
        informacion: informacion,
        imagenUbicacion:
          typeof req.files === "object" &&
          req.files.map((imagen) => {
            return imagen.filename;
          }),
      });
      res.status(200).json({ adaptadorNuevo });
    }
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.put("/:id", upload.array("file"), async (req, res, next) => {
  const { id } = req.params;
  const { marca, modelo, tipo, estado, precio, informacion } = req.body;

  try {
    const adaptadorByIdDB = await Adaptador.findOne({ where: { id: id } });
    if (marca !== undefined) {
      await adaptadorByIdDB.update({ marca: marca });
    }
    if (modelo !== undefined) {
      await adaptadorByIdDB.update({ modelo: modelo });
    }
    if (tipo !== undefined) {
      await adaptadorByIdDB.update({ tipo: tipo });
    }
    if (estado !== undefined) {
      await adaptadorByIdDB.update({ estado: estado });
    }
    if (precio !== undefined) {
      await adaptadorByIdDB.update({ precio: precio });
    }
    if (informacion !== undefined) {
      await adaptadorByIdDB.update({ informacion: informacion });
    }
    if (typeof req.files !== undefined) {
      await adaptadorByIdDB.update({
        imagenUbicacion: req.files.map((imagen) => {
          return imagen.filename;
        }),
      });
    }
    res.status(200).json({ adaptadorByIdDB });
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.get("/", async (req, res) => {
  try {
    const adaptadoresDB = await Adaptador.findAll({});
    res.status(200).json({ adaptadoresDB });
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const adaptadorByID = await Adaptador.findOne({ where: { id: id } });
    res.status(200).json({ adaptadorByID });
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
