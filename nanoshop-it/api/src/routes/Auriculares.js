const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const { Op, Modelos } = require("../db.js"); //IMPORTAR MODELOS ACA
const { Auricular, Conjunto } = Modelos;

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
    ficha,
    inalambrico,
    precio,
    estado,
    color,
    informacion,
    cantidad,
  } = req.body;

  try {
    if (cantidad >= 2) {
      //dependiendo la prop cantidad creo 1 o varias instancias y las relaciono con el modelo conjunto en el caso multiple
      const conjunto = await Conjunto.create({
        producto: "Auricular",
        marca: marca,
        modelo: modelo,
        estado: estado,
        cantidad: cantidad,
        precio: precio,
      });

      var coloresArray = [...color.split(",")]; //Lo recibo como un string, entonce los separo para manejar un array

      for (let i = 0; i < cantidad; i++) {
        const colorIterado = coloresArray[i]; //Itero los colores para crear cada auricular con su respectivo color
        var auricularNuevo = await Auricular.create({
          marca: marca,
          modelo: modelo,
          ficha: ficha,
          inalambrico: inalambrico,
          color: coloresArray.length > 1 ? [colorIterado] : coloresArray,
          estado: estado,
          precio: precio,
          informacion: informacion,
          imagenUbicacion:
            typeof req.files === "object" &&
            req.files.map((imagen) => {
              return imagen.filename;
            }),
        });
        conjunto.addAuricular(auricularNuevo); // Relaciono la instancia Auricular con la instancia Conjunto creada
      }
      res.status(200).json({ conjunto });
    } else {
      let auricularNuevo = await Auricular.create({
        marca: marca,
        modelo: modelo,
        ficha: ficha,
        inalambrico: inalambrico,
        color: [color],
        estado: estado,
        precio: precio,
        informacion: informacion,
        imagenUbicacion:
          typeof req.files === "object" &&
          req.files.map((imagen) => {
            return imagen.filename;
          }),
      });
      res.status(200).json({ auricularNuevo });
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
    ficha,
    inalambrico,
    precio,
    estado,
    color,
    informacion,
  } = req.body;
  try {
    const auricularByIdDB = await Auricular.findOne({ where: { id: id } });
    if (typeof marca !== undefined) {
      await auricularByIdDB.update({ marca: marca });
    }
    if (typeof modelo !== undefined) {
      await auricularByIdDB.update({ modelo: modelo });
    }
    if (typeof ficha !== undefined) {
      await auricularByIdDB.update({ ficha: ficha });
    }
    if (typeof inalambrico !== undefined) {
      await auricularByIdDB.update({ inalambrico: inalambrico });
    }
    if (typeof color !== undefined) {
      //undefined porque puede pasarmelo como string o como array dependiendo la esctructura de la peticion
      await auricularByIdDB.update({ color: [color] });
    }
    if (typeof estado !== undefined) {
      await auricularByIdDB.update({ estado: estado });
    }
    if (typeof precio !== undefined) {
      await auricularByIdDB.update({ precio: precio });
    }
    if (typeof informacion !== undefined) {
      await auricularByIdDB.update({ informacion: informacion });
    }
    if (typeof req.files !== undefined) {
      await auricularByIdDB.update({
        imagenUbicacion: req.files.map((imagen) => {
          return imagen.filename;
        }),
      });
    }
    res.status(200).json({ auricularByIdDB });
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.get("/", async (req, res) => {
  try {
    let auricularesDB = await Auricular.findAll({});

    res.json({ auricularesDB }).status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const auricularByID = await Auricular.findOne({ where: { id: id } });
    res.json({ auricularByID }).status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Auricular.destroy({
      where: {
        id: id,
      },
    });
    res.send("Auricular borrado de la base de datos.").status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

module.exports = router;
