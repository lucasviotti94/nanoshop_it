const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const sharp = require("sharp");

const { Op, Modelos } = require("../db.js");
const { Adaptador, Conjunto } = Modelos;

const router = Router();
const storage = multer.diskStorage({
  destination: "public/", // Directorio donde se guardarán las imágenes
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

router.post("/", upload.array("imagenes"), async (req, res, next) => {
  if (req.body.conjunto === "Individual") {
    try {
      const adaptadorBody = req.body;
      const imagenes = req.files;
      const imagenesGuardadas = await Promise.all(
        imagenes.map(async (imagen, i) => {
          const imagenProcesadaBuffer = await sharp(imagen.path)
            .resize({ width: 500, height: 500, fit: "cover" })
            .rotate()
            .toBuffer();
          const nombreArchivo =
            imagen.fieldname +
            "_" +
            Date.now() +
            path.extname(imagen.originalname);
          const rutaArchivo = path.join("public", nombreArchivo);

          await fs.writeFile(rutaArchivo, imagenProcesadaBuffer);
          return rutaArchivo;
        })
      );
      const adaptadorNuevo = await Adaptador.create({
        marca: adaptadorBody.marca,
        modelo: adaptadorBody.modelo,
        ficha: adaptadorBody.ficha,
        inalambrico: adaptadorBody.inalambrico,
        precio: parseInt(adaptadorBody.precio),
        imagenUbicacion: imagenesGuardadas.map((imagen) => {
          return imagen;
        }),
      });
      res.status(200).json({ adaptadorNuevo });
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else if (req.body.conjunto === "Conjunto") {
  } else {
    console.log(" NADA ");
  }
});

// });

// router.put("/:id", upload.array("file"), async (req, res, next) => {
// const { id } = req.params;
// const { marca, modelo, tipo, estado, precio, informacion } = req.body;

// const arrayUbicacionesImagenes = []; //Proceso las imagenes con sharp y almaceno los nombres en el Array
// const imagenesProcesadas = await Promise.all(
//   req.files.map(async (file) => {
//     const imagenProcesadaBuffer = await sharp(file.buffer)
//       .resize({ width: 500, height: 500, fit: "cover" })
//       .rotate()
//       .toBuffer();
//     const nombreArchivo =
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname);
//     arrayUbicacionesImagenes.push(nombreArchivo);
//     const rutaArchivo = path.join("public", nombreArchivo);
//     await fs.writeFile(rutaArchivo, imagenProcesadaBuffer);
//   })
// );
// try {
//   const adaptadorByIdDB = await Adaptador.findOne({ where: { id: id } });
//   if (marca !== undefined) {
//     await adaptadorByIdDB.update({ marca: marca });
//   }
//   if (modelo !== undefined) {
//     await adaptadorByIdDB.update({ modelo: modelo });
//   }
//   if (tipo !== undefined) {
//     await adaptadorByIdDB.update({ tipo: tipo });
//   }
//   if (estado !== undefined) {
//     await adaptadorByIdDB.update({ estado: estado });
//   }
//   if (precio !== undefined) {
//     await adaptadorByIdDB.update({ precio: precio });
//   }
//   if (informacion !== undefined) {
//     await adaptadorByIdDB.update({ informacion: informacion });
//   }
//   if (arrayUbicacionesImagenes.length >= 1) {
//     await adaptadorByIdDB.update({
//       imagenUbicacion: arrayUbicacionesImagenes.map((imagen) => {
//         return imagen;
//       }),
//     });
//   }
//   res.status(200).json({ adaptadorByIdDB });
// } catch (error) {
//   res.send("Error en la operacion: " + error.message).status(500);
// }
// });

router.get("/", async (req, res) => {
  try {
    const adaptadoresDB = await Adaptador.findAll({});
    res.status(200).json({ adaptadoresDB });
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const adaptadorByID = await Adaptador.findOne({ where: { id: id } });
    res.status(200).json({ adaptadorByID });
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Adaptador.destroy({
      where: {
        id: id,
      },
    });
    res.send("Adaptador borrado de la base de datos.").status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

module.exports = router;
