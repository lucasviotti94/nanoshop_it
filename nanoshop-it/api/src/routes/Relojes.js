const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const { Op, Modelos } = require("../db.js");
const { Reloj, Conjunto } = Modelos;

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
const router = Router();

router.post("/", upload.array("file"), async (req, res, next) => {
  const { marca, modelo, color, precio, informacion, cantidad, estado } =
    req.body;

  try {
    if (cantidad >= 2) {
      const conjunto = await Conjunto.create({
        producto: "Reloj",
        marca: marca,
        modelo: modelo,
        estado: estado,
        cantidad: cantidad,
        precio: precio,
      });
      var coloresArray = [...color.split(",")];
      for (let i = 0; i < cantidad; i++) {
        const colorIterado = coloresArray[i];
        let relojNuevo = await Reloj.create({
          marca: marca,
          modelo: modelo,
          color: coloresArray.length > 1 ? [colorIterado] : coloresArray,
          precio: precio,
          estado: estado,
          informacion: informacion,
          imagenUbicacion:
            typeof req.files === "object" &&
            req.files.map((imagen) => {
              return imagen.filename;
            }),
        });
        conjunto.addReloj(relojNuevo);
      }
      res.status(200).json({ relojNuevo });
    } else {
      let relojNuevo = await Reloj.create({
        marca: marca,
        modelo: modelo,
        color: [color],
        precio: precio,
        estado: estado,
        informacion: informacion,
        imagenUbicacion:
          typeof req.files === "object" &&
          req.files.map((imagen) => {
            return imagen.filename;
          }),
      });
      res.status(200).json({ relojNuevo });
    }
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.put("/:id", upload.array("file"), async (req, res, next) => {
  const { marca, modelo, color, precio, informacion } = req.body;
  const { id } = req.params;

  try {
    const relojByIdDB = await Reloj.findOne({ where: { id: id } });

    if (typeof marca !== undefined) {
      await relojByIdDB.update({ marca: marca });
    }
    if (typeof modelo !== undefined) {
      await relojByIdDB.update({ modelo: modelo });
    }
    if (typeof color !== undefined) {
      await relojByIdDB.update({ color: [color] });
    }
    if (typeof precio !== undefined) {
      await relojByIdDB.update({ precio: precio });
    }
    if (typeof informacion !== undefined) {
      await relojByIdDB.update({ informacion: informacion });
    }
    if (typeof req.files !== undefined) {
      await relojByIdDB.update({
        imagenUbicacion: req.files.map((imagen) => {
          return imagen.filename;
        }),
      });
    }
    res.status(200).json({ relojByIdDB });
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Reloj.destroy({
      where: {
        id: id,
      },
    });
    res.send("Reloj borrado de la base de datos.").status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.get("/", async (req, res) => {
  try {
    let relojesDB = await Reloj.findAll({});

    res.status(200).json({ relojesDB });
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const relojByID = await Reloj.findOne({ where: { id: id } });
    res.json({ relojByID }).status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

module.exports = router;
