const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const sharp = require("sharp");

const { Op, Modelos } = require("../db.js");
const { Cargador, Conjunto } = Modelos;

const router = Router();
const storage = multer.diskStorage({
  destination: "public", // Directorio donde se guardarán las imágenes
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

router.post("/", upload.array("imagenes"), async (req, res, next) => {
  const form = req.body;
  const imagenes = req.files;
  const imagenesGuardadas = await Promise.all(
    imagenes.map(async (imagen, i) => {
      const imagenProcesadaBuffer = await sharp(imagen.path)
        .resize({ width: 500, height: 500, fit: "cover" })
        .rotate()
        .toBuffer();
      const nombreArchivo =
        imagen.fieldname + "_" + Date.now() + path.extname(imagen.originalname);
      const rutaArchivo = path.join("public", nombreArchivo);

      await fs.writeFile(rutaArchivo, imagenProcesadaBuffer);
      return rutaArchivo;
    })
  );
  if (form.conjunto === "Individual") {
    try {
      const cargadorNuevo = await Cargador.create({
        marca: form.marca,
        modelo: form.modelo,
        inalambrico: form.inalambrico === "true" ? true : false,
        deAuto: form.deAuto,
        estado: form.estado,
        precio: parseInt(form.precio),
        informacion: form.informacion,
        imagenUbicacion: imagenesGuardadas.map((imagen) => {
          return imagen;
        }),
      });
      res.status(200).json({ cargadorNuevo });
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else if (form.conjunto === "Conjunto") {
    try {
      const cargadorNuevo = await Cargador.create({
        marca: form.marca,
        modelo: form.modelo,
        inalambrico: form.inalambrico === "true" ? true : false,
        deAuto: form.deAuto,
        estado: form.estado,
        precio: parseInt(form.precio),
        informacion: form.informacion,
        imagenUbicacion: imagenesGuardadas.map((imagen) => {
          return imagen;
        }),
      });
      const conjunto = await Conjunto.findByPk(form.idConjunto);
      conjunto.addCargador(cargadorNuevo);
      res.status(200).json({ cargadorNuevo });
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else {
    res.status(500).send("No tiene Conjunto.");
  }
});

router.put("/:id", upload.array("imagenes"), async (req, res, next) => {
  const { id } = req.params;
  const { marca, modelo, inalambrico, deAuto, estado, precio, informacion } =
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
    const cargadorByIdDB = await Cargador.findOne({ where: { id: id } });

    if (marca !== undefined) {
      await cargadorByIdDB.update({ marca: marca });
    }
    if (modelo !== undefined) {
      await cargadorByIdDB.update({ modelo: modelo });
    }
    if (inalambrico !== undefined) {
      await cargadorByIdDB.update({ inalambrico: inalambrico });
    }
    if (deAuto !== undefined) {
      await cargadorByIdDB.update({ deAuto: deAuto });
    }
    if (estado !== undefined) {
      await cargadorByIdDB.update({ estado: estado });
    }
    if (precio !== undefined) {
      await cargadorByIdDB.update({ precio: precio });
    }
    if (informacion !== undefined) {
      await cargadorByIdDB.update({ informacion: informacion });
    }
    if (arrayUbicacionesImagenes.length >= 1) {
      await cargadorByIdDB.update({
        imagenUbicacion: arrayUbicacionesImagenes.map((imagen) => {
          return imagen;
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
