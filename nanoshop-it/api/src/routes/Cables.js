const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const sharp = require("sharp");

const { Op, Modelos } = require("../db.js");
const { Cable, Conjunto } = Modelos;

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
      const cableNuevo = await Cable.create({
        marca: form.marca,
        modelo: form.modelo,
        ficha: form.ficha,
        largo: form.largo,
        color: form.color,
        estado: form.estado,
        precio: parseInt(form.precio),
        informacion: form.informacion,
        imagenUbicacion: imagenesGuardadas.map((imagen) => {
          return imagen;
        }),
      });
      res.status(200).json({ cableNuevo });
    } catch (error) {
      res.status(500).send(error.message);
      console.log("error", error);
    }
  } else if (form.conjunto === "Conjunto") {
    try {
      try {
        const cableNuevo = await Cable.create({
          marca: form.marca,
          modelo: form.modelo,
          ficha: form.ficha,
          largo: form.largo,
          color: form.color,
          estado: form.estado,
          precio: parseInt(form.precio),
          informacion: form.informacion,
          imagenUbicacion: imagenesGuardadas.map((imagen) => {
            return imagen;
          }),
        });
        const conjunto = await Conjunto.findByPk(form.idConjunto);
        await conjunto.addCable(cableNuevo);
        res.status(200).json({ cableNuevo });
      } catch (error) {
        res.status(500).send(error.message);
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else {
    res.status(500).send("No tiene Conjunto.");
  }
});

router.put("/:id", upload.array("imagenes"), async (req, res, next) => {
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
    if (marca !== undefined) {
      await cableByIdDB.update({ marca: marca });
    }
    if (modelo !== undefined) {
      await cableByIdDB.update({ modelo: modelo });
    }
    if (ficha !== undefined) {
      await cableByIdDB.update({ ficha: ficha });
    }
    if (largo !== undefined) {
      await cableByIdDB.update({ largo: largo });
    }
    if (color !== undefined) {
      await cableByIdDB.update({ color: color });
    }
    if (estado !== undefined) {
      await cableByIdDB.update({ estado: estado });
    }
    if (precio !== undefined) {
      await cableByIdDB.update({ precio: precio });
    }
    if (informacion !== undefined) {
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
