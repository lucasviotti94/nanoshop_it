const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const { Op, Modelos } = require("../db.js");
const { Funda, Conjunto } = Modelos;

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
  const { marca, modelo, tipo, color, precio, informacion, cantidad } =
    req.body;

  try {
    if (cantidad >= 2) {
      const conjunto = await Conjunto.create({
        producto: "Funda",
        marca: marca,
        modelo: modelo,
        cantidad: cantidad,
        precio: precio,
      });
      var coloresArray = [...color.split(",")];
      for (let i = 0; i < cantidad; i++) {
        const colorIterado = coloresArray[i];
        let fundaNueva = await Funda.create({
          marca: marca,
          modelo: modelo,
          tipo: tipo,
          color: coloresArray.length > 1 ? [colorIterado] : coloresArray,
          precio: precio,
          informacion: informacion,
          imagenUbicacion:
            typeof req.files === "object" &&
            req.files.map((imagen) => {
              return imagen.filename;
            }),
        });
        conjunto.addFunda(fundaNueva);
      }
      res.status(200).json({ conjunto });
    } else {
      let fundaNueva = await Funda.create({
        marca: marca,
        modelo: modelo,
        tipo: tipo,
        color: [color],
        precio: precio,
        informacion: informacion,
        imagenUbicacion:
          typeof req.files === "object" &&
          req.files.map((imagen) => {
            return imagen.filename;
          }),
      });
      res.status(200).json({ fundaNueva });
    }
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.put("/:id", upload.array("file"), async (req, res, next) => {
  const { id } = req.params;
  const { marca, modelo, tipo, color, precio, informacion } = req.body;

  try {
    const fundaByIdDB = await Funda.findOne({ where: { id: id } });

    if (typeof marca !== undefined) {
      await fundaByIdDB.update({ marca: marca });
    }
    if (typeof marca !== undefined) {
      await fundaByIdDB.update({ modelo: modelo });
    }
    if (typeof tipo !== undefined) {
      await fundaByIdDB.update({ tipo: tipo });
    }
    if (typeof color !== undefined) {
      await fundaByIdDB.update({ color: [color] });
    }
    if (typeof precio !== undefined) {
      await fundaByIdDB.update({ precio: precio });
    }
    if (typeof informacion !== undefined) {
      await fundaByIdDB.update({ informacion: informacion });
    }
    if (typeof req.files !== undefined) {
      await fundaByIdDB.update({
        imagenUbicacion: req.files.map((imagen) => {
          return imagen.filename;
        }),
      });
    }
    res.status(200).json({ fundaByIdDB });
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Funda.destroy({
      where: {
        id: id,
      },
    });
    res.send("Funda borrado de la base de datos.").status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.get("/", async (req, res) => {
  try {
    let fundasDB = await Funda.findAll({});
    res.status(200).json({ fundasDB });
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const fundaByID = await Funda.findOne({ where: { id: id } });
    res.json({ fundaByID }).status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

module.exports = router;
