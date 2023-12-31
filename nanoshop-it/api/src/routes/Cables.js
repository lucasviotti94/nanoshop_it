const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const sharp = require("sharp");

const { Op, Modelos } = require("../db.js");
const { Cable, Conjunto } = Modelos;

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.array("file"), async (req, res, next) => {
  const {
    marca,
    modelo,
    ficha,
    largo,
    precio,
    estado,
    cantidad,
    color,
    informacion,
  } = req.body;

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
        producto: "Cable",
        marca: marca,
        modelo: modelo,
        cantidad: cantidad,
        precio: precio,
      });

      var coloresArray = [...color.split(",")];

      for (let i = 0; i < cantidad; i++) {
        const colorIterado = coloresArray[i];
        let cableNuevo = await Cable.create({
          marca: marca,
          modelo: modelo,
          ficha: ficha,
          largo: largo,
          color: coloresArray.length > 1 ? [colorIterado] : coloresArray,
          estado: estado,
          precio: precio,
          informacion: informacion,
          imagenUbicacion: arrayUbicacionesImagenes.map((imagen) => {
            return imagen;
          }),
        });
        conjunto.addCable(cableNuevo);
      }
      res.status(200).json({ conjunto });
    } else {
      let cableNuevo = await Cable.create({
        marca: marca,
        modelo: modelo,
        ficha: ficha,
        largo: largo,
        color: [color],
        estado: estado,
        precio: precio,
        informacion: informacion,
        imagenUbicacion: arrayUbicacionesImagenes.map((imagen) => {
          return imagen;
        }),
      });
      res.status(200).json({ cableNuevo });
    }
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.put("/:id", upload.array("file"), async (req, res, next) => {
  const { id } = req.params;
  const { marca, modelo, ficha, largo, precio, estado, color, informacion } =
    req.body;

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
    const cableByIdDB = await Cable.findOne({ where: { id: id } });
    if (typeof marca !== undefined) {
      await cableByIdDB.update({ marca: marca });
    }
    if (typeof modelo !== undefined) {
      await cableByIdDB.update({ modelo: modelo });
    }
    if (typeof ficha !== undefined) {
      await cableByIdDB.update({ ficha: ficha });
    }
    if (typeof largo !== undefined) {
      await cableByIdDB.update({ largo: largo });
    }
    if (typeof color !== undefined) {
      await cableByIdDB.update({ color: [color] });
    }
    if (typeof estado !== undefined) {
      await cableByIdDB.update({ estado: estado });
    }
    if (typeof precio !== undefined) {
      await cableByIdDB.update({ precio: precio });
    }
    if (typeof informacion !== undefined) {
      await cableByIdDB.update({ informacion: informacion });
    }
    if (arrayUbicacionesImagenes.length >= 1) {
      await cableByIdDB.update({
        imagenUbicacion: arrayUbicacionesImagenes.map((imagen) => {
          return imagen;
        }),
      });
    }
    res.status(200).json({ cableByIdDB });
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.get("/", async (req, res) => {
  try {
    let CablesDB = await Cable.findAll({});

    res.status(200).json({ CablesDB });
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cableByID = await Cable.findOne({ where: { id: id } });
    res.json({ cableByID }).status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Cable.destroy({
      where: {
        id: id,
      },
    });
    res.send("Cable borrado de la base de datos.").status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

module.exports = router;
