const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const { Op, Modelos } = require("../db.js");
const { Tablet, Conjunto } = Modelos;

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
  const {
    marca,
    modelo,
    color,
    estado,
    pantalla,
    almacenamiento,
    precio,
    informacion,
    cantidad,
  } = req.body;

  try {
    if (cantidad >= 2) {
      const conjunto = await Conjunto.create({
        producto: "Tablet",
        marca: marca,
        modelo: modelo,
        estado: estado,
        cantidad: cantidad,
        precio: precio,
      });
      var coloresArray = [...color.split(",")];
      for (let i = 0; i < cantidad; i++) {
        const colorIterado = coloresArray[i];
        let tabletNueva = await Tablet.create({
          marca: marca,
          modelo: modelo,
          color: coloresArray.length > 1 ? [colorIterado] : coloresArray,
          almacenamiento: almacenamiento,
          pantalla: pantalla,
          precio: precio,
          informacion: informacion,
          imagenUbicacion:
            typeof req.files === "object" &&
            req.files.map((imagen) => {
              return imagen.filename;
            }),
        });
        conjunto.addTablet(tabletNueva);
      }
      res.status(200).json({ tabletNueva });
    } else {
      let tabletNueva = await Tablet.create({
        marca: marca,
        modelo: modelo,
        color: [color],
        almacenamiento: almacenamiento,
        pantalla: pantalla,
        precio: precio,
        informacion: informacion,
        imagenUbicacion:
          typeof req.files === "object" &&
          req.files.map((imagen) => {
            return imagen.filename;
          }),
      });
      res.status(200).json({ tabletNueva });
    }
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { marca, modelo, color, tamaño, almacenamiento, precio, informacion } =
    req.body;

  try {
    const tabletByIdDB = await Tablet.findOne({ where: { id: id } });

    if (typeof marca !== undefined) {
      await tabletByIdDB.update({ marca: marca });
    }
    if (typeof modelo !== undefined) {
      await tabletByIdDB.update({ modelo: modelo });
    }
    if (typeof color !== undefined) {
      await tabletByIdDB.update({ color: [color] });
    }
    if (typeof tamaño !== undefined) {
      await tabletByIdDB.update({ tamaño: tamaño });
    }
    if (typeof almacenamiento !== undefined) {
      await tabletByIdDB.update({ almacenamiento: almacenamiento });
    }
    if (typeof precio !== undefined) {
      await tabletByIdDB.update({ precio: precio });
    }
    if (typeof informacion !== undefined) {
      await tabletByIdDB.update({ informacion: informacion });
    }
    if (typeof req.files !== undefined) {
      await tabletByIdDB.update({
        imagenUbicacion: req.files.map((imagen) => {
          return imagen.filename;
        }),
      });
    }
    res.status(200).json({ tabletByIdDB });
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Tablet.destroy({
      where: {
        id: id,
      },
    });
    res.send("Tablet borrado de la base de datos.").status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.get("/", async (req, res) => {
  try {
    let tabletsDB = await Tablet.findAll({});

    res.status(200).json({ tabletsDB });
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tabletByID = await Tablet.findOne({ where: { id: id } });
    res.json({ tabletByID }).status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

module.exports = router;
