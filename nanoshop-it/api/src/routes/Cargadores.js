const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const { Op, Modelos } = require("../db.js");
const { Cargador, Conjunto } = Modelos;

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
  const {
    marca,
    modelo,
    inalambrico,
    color,
    deAuto,
    cantidad,
    precio,
    informacion,
  } = req.body;

  try {
    if (cantidad >= 2) {
      const conjunto = await Conjunto.create({
        producto: "Cargador",
        marca: marca,
        modelo: modelo,
        cantidad: cantidad,
        precio: precio,
      });

      var coloresArray = [...color.split(",")];

      for (let i = 0; i < cantidad; i++) {
        const colorIterado = coloresArray[i];

        let cargadorNuevo = await Cargador.create({
          marca: marca,
          modelo: modelo,
          inalambrico: inalambrico,
          color: coloresArray.length > 1 ? [colorIterado] : coloresArray,
          deAuto: deAuto,
          precio: precio,
          informacion: informacion,
          imagenUbicacion:
            typeof req.files === "object" &&
            req.files.map((imagen) => {
              return imagen.filename;
            }),
        });
        conjunto.addCargador(cargadorNuevo);
      }
      res.status(200).json({ conjunto });
    } else {
      let cargadorNuevo = await Cargador.create({
        marca: marca,
        modelo: modelo,
        inalambrico: inalambrico,
        color: [color],
        deAuto: deAuto,
        precio: precio,
        informacion: informacion,
        imagenUbicacion:
          typeof req.files === "object" &&
          req.files.map((imagen) => {
            return imagen.filename;
          }),
      });
      res.status(200).json({ cargadorNuevo });
    }
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.put("/:id", upload.array("file"), async (req, res, next) => {
  const { id } = req.params;
  const { marca, modelo, inalambrico, deAuto, estado, precio, informacion } =
    req.body;

  try {
    const cargadorByIdDB = await Cargador.findOne({ where: { id: id } });

    if (typeof marca !== undefined) {
      await cargadorByIdDB.update({ marca: marca });
    }
    if (typeof modelo !== undefined) {
      await cargadorByIdDB.update({ modelo: modelo });
    }
    if (typeof inalambrico !== undefined) {
      await cargadorByIdDB.update({ inalambrico: inalambrico });
    }
    if (typeof deAuto !== undefined) {
      await cargadorByIdDB.update({ deAuto: deAuto });
    }
    if (typeof estado !== undefined) {
      await cargadorByIdDB.update({ estado: estado });
    }
    if (typeof precio !== undefined) {
      await cargadorByIdDB.update({ precio: precio });
    }
    if (typeof informacion !== undefined) {
      await cargadorByIdDB.update({ informacion: informacion });
    }
    if (typeof req.files !== undefined) {
      await cargadorByIdDB.update({
        imagenUbicacion: req.files.map((imagen) => {
          return imagen.filename;
        }),
      });
    }
    res.status(200).json({ cargadorByIdDB });
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Cargador.destroy({
      where: {
        id: id,
      },
    });
    res.send("Cargador borrado de la base de datos.").status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.get("/", async (req, res) => {
  try {
    let CargadoresDB = await Cargador.findAll({});

    res.status(200).json({ CargadoresDB });
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cargadorByID = await Cargador.findOne({ where: { id: id } });
    res.json({ cargadorByID }).status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

module.exports = router;
