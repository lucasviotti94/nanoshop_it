const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const sharp = require("sharp");

const { Op, Modelos } = require("../db.js");
const { Celular, Conjunto } = Modelos;

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.array("file"), async (req, res, next) => {
  const {
    marca,
    modelo,
    almacenamiento,
    color,
    estado,
    bateria,
    precio,
    cantidad,
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
        producto: "Celular",
        marca: marca,
        modelo: modelo,
        estado: estado,
        cantidad: cantidad,
        precio: precio,
      });

      var coloresArray = [...color.split(",")];

      for (let i = 0; i < cantidad; i++) {
        const colorIterado = coloresArray[i];
        let celularNuevo = await Celular.create({
          marca: marca,
          modelo: modelo,
          almacenamiento: almacenamiento,
          color: coloresArray.length > 1 ? [colorIterado] : coloresArray,
          estado: estado,
          bateria: bateria,
          precio: precio,
          informacion: informacion,
          imagenUbicacion: arrayUbicacionesImagenes.map((imagen) => {
            return imagen;
          }),
        });
        conjunto.addCelular(celularNuevo);
      }
      res.status(200).json({ conjunto });
    } else {
      let celularNuevo = await Celular.create({
        marca: marca,
        modelo: modelo,
        almacenamiento: almacenamiento,
        color: [color],
        estado: estado,
        bateria: bateria,
        precio: precio,
        informacion: informacion,
        imagenUbicacion: arrayUbicacionesImagenes.map((imagen) => {
          return imagen;
        }),
      });
      res.status(200).json({ celularNuevo });
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
    almacenamiento,
    color,
    estado,
    bateria,
    precio,
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
    const celularByIdDB = await Celular.findOne({ where: { id: id } });

    if (typeof marca !== undefined) {
      await celularByIdDB.update({ marca: marca });
    }
    if (typeof modelo !== undefined) {
      await celularByIdDB.update({ modelo: modelo });
    }
    if (typeof almacenamiento !== undefined) {
      await celularByIdDB.update({ almacenamiento: almacenamiento });
    }
    if (typeof color !== undefined) {
      await celularByIdDB.update({ color: [color] });
    }
    if (typeof estado !== undefined) {
      await celularByIdDB.update({ estado: estado });
    }
    if (typeof bateria !== undefined) {
      await celularByIdDB.update({ bateria: bateria });
    }
    if (typeof precio !== undefined) {
      await celularByIdDB.update({ precio: precio });
    }
    if (typeof informacion !== undefined) {
      await celularByIdDB.update({ informacion: informacion });
    }
    if (arrayUbicacionesImagenes.length >= 1) {
      await celularByIdDB.update({
        imagenUbicacion: arrayUbicacionesImagenes.map((imagen) => {
          return imagen;
        }),
      });
    }
    res.status(200).json({ celularByIdDB });
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Celular.destroy({
      where: {
        id: id,
      },
    });
    res.send("Celular borrado de la base de datos.").status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.get("/", async (req, res) => {
  try {
    let celularesDB = await Celular.findAll({});

    res.status(200).json({ celularesDB });
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const celularByID = await Celular.findOne({ where: { id: id } });
    res.json({ celularByID }).status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

module.exports = router;
