const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const { Op, Modelos } = require("../db.js");
const { Vidrio_Protector, Conjunto } = Modelos;

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
  const { marca, modelo, color, precio, informacion, cantidad } = req.body;

  try {
    if (cantidad >= 2) {
      const conjunto = await Conjunto.create({
        producto: "Vidrio_Protector",
        marca: marca,
        modelo: modelo,
        cantidad: cantidad,
        precio: precio,
      });
      var coloresArray = [...color.split(",")];
      for (let i = 0; i < cantidad; i++) {
        const colorIterado = coloresArray[i];
        let vidrioNuevo = await Vidrio_Protector.create({
          marca: marca,
          modelo: modelo,
          color: coloresArray.length > 1 ? [colorIterado] : coloresArray,
          precio: precio,
          informacion: informacion,
          imagenUbicacion:
            typeof req.files === "object" &&
            req.files.map((imagen) => {
              return imagen.filename;
            }),
        });
        conjunto.addVidrio_Protector(vidrioNuevo);
      }
      res.status(200).json({ conjunto });
    } else {
      let vidrioNuevo = await Vidrio_Protector.create({
        marca: marca,
        modelo: modelo,
        color: [color],
        precio: precio,
        informacion: informacion,
        imagenUbicacion:
          typeof req.files === "object" &&
          req.files.map((imagen) => {
            return imagen.filename;
          }),
      });
      res.status(200).json({ vidrioNuevo });
    }
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.put("/:id", async (req, res, next) => {
  const { marca, modelo, color, precio, informacion } = req.body;
  const { id } = req.params;
  try {
    const vidrioByIdDB = await Vidrio_Protector.findOne({ where: { id: id } });
    if (typeof marca !== undefined) {
      await vidrioByIdDB.update({ marca: marca });
    }
    if (typeof modelo !== undefined) {
      await vidrioByIdDB.update({ modelo: modelo });
    }
    if (typeof color !== undefined) {
      await vidrioByIdDB.update({ color: [color] });
    }
    if (typeof precio !== undefined) {
      await vidrioByIdDB.update({ precio: precio });
    }
    if (typeof informacion !== undefined) {
      await vidrioByIdDB.update({ informacion: informacion });
    }
    if (typeof req.files !== undefined) {
      await vidrioByIdDB.update({
        imagenUbicacion: req.files.map((imagen) => {
          return imagen.filename;
        }),
      });
    }
    res.status(200).json({ vidrioByIdDB });
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Vidrio_Protector.destroy({
      where: {
        id: id,
      },
    });
    res.send("Vidrio borrado de la base de datos.").status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.get("/", async (req, res) => {
  try {
    let vidriosDB = await Vidrio_Protector.findAll({});

    res.status(200).json({ vidriosDB });
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const vidrioProtectorByID = await Vidrio_Protector.findOne({
      where: { id: id },
    });
    res.status(200).json({ vidrioProtectorByID });
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

module.exports = router;
