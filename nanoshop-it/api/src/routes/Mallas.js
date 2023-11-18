const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const sharp = require("sharp");

const { Op, Modelos } = require("../db.js");
const { Malla, Conjunto } = Modelos;

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.array("file"), async (req, res, next) => {
  const { marca, modelo, color, precio, informacion, cantidad } = req.body;

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
        producto: "Malla",
        marca: marca,
        modelo: modelo,
        cantidad: cantidad,
        precio: precio,
      });
      var coloresArray = [...color.split(",")];
      for (let i = 0; i < cantidad; i++) {
        const colorIterado = coloresArray[i];
        let mallaNueva = await Malla.create({
          marca: marca,
          modelo: modelo,
          color: coloresArray.length > 1 ? [colorIterado] : coloresArray,
          precio: precio,
          informacion: informacion,
          imagenUbicacion: arrayUbicacionesImagenes.map((imagen) => {
            return imagen;
          }),
        });
        conjunto.addMalla(mallaNueva);
      }
      res.status(200).json({ conjunto });
    } else {
      let mallaNueva = await Malla.create({
        marca: marca,
        modelo: modelo,
        color: [color],
        precio: precio,
        informacion: informacion,
        imagenUbicacion: arrayUbicacionesImagenes.map((imagen) => {
          return imagen;
        }),
      });
      res.status(200).json({ mallaNueva });
    }
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.put("/:id", async (req, res, next) => {
  const { marca, modelo, color, precio, informacion } = req.body;
  const { id } = req.params;

  const arrayUbicacionesImagenes = []; //Proceso las imagenes con sharp y almaceno los nombres en el Array
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
    const mallaByIdDB = await Malla.findOne({ where: { id: id } });

    if (typeof marca !== undefined) {
      await mallaByIdDB.update({ marca: marca });
    }
    if (typeof modelo !== undefined) {
      await mallaByIdDB.update({ modelo: modelo });
    }
    if (typeof color !== undefined) {
      await mallaByIdDB.update({ color: [color] });
    }
    if (typeof precio !== undefined) {
      await mallaByIdDB.update({ precio: precio });
    }
    if (typeof informacion !== undefined) {
      await mallaByIdDB.update({ informacion: informacion });
    }
    if (arrayUbicacionesImagenes.length >= 1) {
      await mallaByIdDB.update({
        imagenUbicacion: arrayUbicacionesImagenes.map((imagen) => {
          return imagen;
        }),
      });
    }
    res.status(200).json({ mallaByIdDB });
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Malla.destroy({
      where: {
        id: id,
      },
    });
    res.send("Malla borrado de la base de datos.").status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.get("/", async (req, res) => {
  try {
    let mallasDB = await Malla.findAll({});

    res.status(200).json({ mallasDB });
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const mallaByID = await Malla.findOne({ where: { id: id } });
    res.json({ mallaByID }).status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

module.exports = router;
