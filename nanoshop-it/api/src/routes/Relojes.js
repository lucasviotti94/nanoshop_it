const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const sharp = require("sharp");

const { Op, Modelos } = require("../db.js");
const { Reloj, Conjunto } = Modelos;

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.array("file"), async (req, res, next) => {
  const { marca, modelo, color, precio, informacion, cantidad, estado } =
    req.body;

  const arrayUbicacionesImagenes = [];
  const imagenesProcesadas = await Promise.all(
    req.files.map(async (file) => {
      const imagenProcesadaBuffer = await sharp(file.buffer)
        .resize({ width: 500, height: 500, fit: "cover" })
        .rotate()
        .toBuffer();
      const nombreArchivo =
        file.fieldname + "_" + Date.now() + path.extname(file.originalname);
      arrayUbicacionesImagenes.push(nombreArchivo);
      const rutaArchivo = path.join("public", nombreArchivo);
      await fs.writeFile(rutaArchivo, imagenProcesadaBuffer);
    })
  );

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
          imagenUbicacion: arrayUbicacionesImagenes.map((imagen) => {
            return imagen;
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
        imagenUbicacion: arrayUbicacionesImagenes.map((imagen) => {
          return imagen;
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

  const arrayUbicacionesImagenes = [];
  const imagenesProcesadas = await Promise.all(
    req.files.map(async (file) => {
      const imagenProcesadaBuffer = await sharp(file.buffer)
        .resize({ width: 500, height: 500, fit: "cover" })
        .rotate()
        .toBuffer();
      const nombreArchivo =
        file.fieldname + "_" + Date.now() + path.extname(file.originalname);
      arrayUbicacionesImagenes.push(nombreArchivo);
      const rutaArchivo = path.join("public", nombreArchivo);
      await fs.writeFile(rutaArchivo, imagenProcesadaBuffer);
    })
  );

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
    if (arrayUbicacionesImagenes.length >= 1) {
      await relojByIdDB.update({
        imagenUbicacion: arrayUbicacionesImagenes.map((imagen) => {
          return imagen;
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
