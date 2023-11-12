const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const { Op, Modelos } = require("../db.js");
const { Fuente, Conjunto } = Modelos;

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
  const { marca, tipo, precio, informacion, estado, modelo, cantidad } =
    req.body;

  try {
    if (cantidad >= 2) {
      const conjunto = await Conjunto.create({
        producto: "Fuente",
        marca: marca,
        modelo: modelo,
        estado: estado,
        cantidad: cantidad,
        precio: precio,
      });
      for (let i = 0; i < cantidad; i++) {
        let fuenteNueva = await Fuente.create({
          marca: marca,
          tipo: tipo,
          precio: precio,
          informacion: informacion,
          imagenUbicacion:
            typeof req.files === "object" &&
            req.files.map((imagen) => {
              return imagen.filename;
            }),
        });
        conjunto.addFuente(fuenteNueva);
      }
      res.status(200).json({ conjunto });
    } else {
      let fuenteNueva = await Fuente.create({
        marca: marca,
        tipo: tipo,
        precio: precio,
        informacion: informacion,
        imagenUbicacion:
          typeof req.files === "object" &&
          req.files.map((imagen) => {
            return imagen.filename;
          }),
      });
      res.status(200), json({ fuenteNueva });
    }

    res.status(200).json({ fuenteNueva });
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { marca, tipo, precio, informacion } = req.body;
  try {
    const fuenteByIdDB = await Fuente.findOne({ where: { id: id } });
    if (typeof marca !== undefined) {
      await fuenteByIdDB.update({ marca: marca });
    }
    if (typeof tipo !== undefined) {
      await fuenteByIdDB.update({ tipo: tipo });
    }
    if (typeof precio !== undefined) {
      await fuenteByIdDB.update({ precio: precio });
    }
    if (typeof informacion !== undefined) {
      await fuenteByIdDB.update({ informacion: informacion });
    }
    if (typeof req.files !== undefined) {
      await fuenteByIdDB.update({
        imagenUbicacion: req.files.map((imagen) => {
          return imagen.filename;
        }),
      });
    }
    res.status(200).json({ fuenteByIdDB });
  } catch (error) {
    res.status(500).send("entro al catch");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Fuente.destroy({
      where: {
        id: id,
      },
    });
    res.send("Fuente borrado de la base de datos.").status(200);
  } catch (error) {
    res.send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    let fuentesDB = await Fuente.findAll({});

    res.status(200).json({ fuentesDB });
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const fuenteByID = await Fuente.findOne({ where: { id: id } });
    res.json({ fuenteByID }).status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

module.exports = router;
