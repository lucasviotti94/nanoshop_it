const { Router } = require("express");
const multer = require("multer");

const { Op, Modelos } = require("../db.js");
const { Computadora, Conjunto } = Modelos;

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
    memoria,
    almacenamiento,
    pantalla,
    color,
    chip,
    estado,
    precio,
    cantidad,
    informacion,
  } = req.body;

  try {
    if (cantidad >= 2) {
      const conjunto = await Conjunto.create({
        producto: "Computadora",
        marca: marca,
        modelo: modelo,
        estado: estado,
        cantidad: cantidad,
        precio: precio,
      });

      var coloresArray = [...color.split(",")];

      for (let i = 0; i < cantidad; i++) {
        const colorIterado = coloresArray[i];
        let computadoraNueva = await Computadora.create({
          marca: marca,
          modelo: modelo,
          memoria: memoria,
          almacenamiento: almacenamiento,
          pantalla: pantalla,
          color: coloresArray.length > 1 ? [colorIterado] : coloresArray,
          chip: chip,
          estado: estado,
          precio: precio,
          informacion: informacion,
          imagenUbicacion:
            typeof req.files === "object" &&
            req.files.map((imagen) => {
              return imagen.filename;
            }),
        });
        conjunto.addComputadora(computadoraNueva);
      }
      res.status(200).json({ conjunto });
    } else {
      let computadoraNueva = await Computadora.create({
        marca: marca,
        modelo: modelo,
        memoria: memoria,
        almacenamiento: almacenamiento,
        pantalla: pantalla,
        color: [color],
        chip: chip,
        estado: estado,
        precio: precio,
        informacion: informacion,
        imagenUbicacion:
          typeof req.files === "object" &&
          req.files.map((imagen) => {
            return imagen.filename;
          }),
      });
      res.status(200).json({ computadoraNueva });
    }
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.put("/:id", upload.array("file"), async (req, res, next) => {
  const { id } = req.params;
  const {
    marca,
    modelo,
    memoria,
    almacenamiento,
    pantalla,
    color,
    chip,
    estado,
    precio,
    informacion,
  } = req.body;

  try {
    const computadoraByIdDB = await Computadora.findOne({ where: { id: id } });

    if (typeof marca !== undefined) {
      await computadoraByIdDB.update({ marca: marca });
    }
    if (typeof modelo !== undefined) {
      await computadoraByIdDB.update({ modelo: modelo });
    }
    if (typeof memoria !== undefined) {
      await computadoraByIdDB.update({ memoria: memoria });
    }
    if (typeof almacenamiento !== undefined) {
      await computadoraByIdDB.update({ almacenamiento: almacenamiento });
    }
    if (typeof pantalla !== undefined) {
      await computadoraByIdDB.update({ pantalla: pantalla });
    }
    if (typeof color !== undefined) {
      await computadoraByIdDB.update({ color: [color] });
    }
    if (typeof chip !== undefined) {
      await computadoraByIdDB.update({ chip: chip });
    }
    if (typeof estado !== undefined) {
      await computadoraByIdDB.update({ estado: estado });
    }
    if (typeof precio !== undefined) {
      await computadoraByIdDB.update({ precio: precio });
    }
    if (typeof informacion !== undefined) {
      await computadoraByIdDB.update({ informacion: informacion });
    }
    if (typeof req.files !== undefined) {
      await computadoraByIdDB.update({
        imagenUbicacion: req.files.map((imagen) => {
          return imagen.filename;
        }),
      });
    }
    res.status(200).json({ computadoraByIdDB });
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Computadora.destroy({
      where: {
        id: id,
      },
    });
    res.send("Computadora borrado de la base de datos.").status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.get("/", async (req, res) => {
  try {
    let computadorasDB = await Computadora.findAll({});

    res.status(200).json({ computadorasDB });
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const computadoraByID = await Computadora.findOne({ where: { id: id } });
    res.json({ computadoraByID }).status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

module.exports = router;
