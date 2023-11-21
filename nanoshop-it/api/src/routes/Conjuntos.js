const Sequelize = require("sequelize");
const { Router } = require("express");
const { Op, Modelos } = require("../db.js");
const {
  Adaptador,
  Auricular,
  Cable,
  Cargador,
  Celular,
  Computadora,
  Fuente,
  Funda,
  Malla,
  Reloj,
  Tablet,
  Vidrio_Protector,
  Conjunto,
} = Modelos;

const router = Router();

router.get("/:id", async (req, res) => {
  //Busco el conjunto por ID y dependiendo la prop producto que trae la peticion voy a traer todas sus instacias relacionadas a este Conjunto
  try {
    const { id } = req.params;
    const { producto } = req.body;

    if (producto === "Adaptador") {
      const conjunto = await Conjunto.findByPk(id, {
        include: Adaptador,
      });
      res.status(200).json({ conjunto });
    }
    if (producto === "Auricular") {
      const conjunto = await Conjunto.findByPk(id, {
        include: Auricular,
      });
      res.status(200).json({ conjunto });
    }
    if (producto === "Cable") {
      const conjunto = await Conjunto.findByPk(id, {
        include: Cable,
      });
      res.status(200).json({ conjunto });
    }
    if (producto === "Cargador") {
      const conjunto = await Conjunto.findByPk(id, {
        include: Cargador,
      });
      res.status(200).json({ conjunto });
    }
    if (producto === "Celular") {
      const conjunto = await Conjunto.findByPk(id, {
        include: Celular,
      });
      res.status(200).json({ conjunto });
    }
    if (producto === "Computadora") {
      const conjunto = await Conjunto.findByPk(id, {
        include: Computadora,
      });
      res.status(200).json({ conjunto });
    }
    if (producto === "Fuente") {
      const conjunto = await Conjunto.findByPk(id, {
        include: Fuente,
      });
      res.status(200).json({ conjunto });
    }
    if (producto === "Funda") {
      const conjunto = await Conjunto.findByPk(id, {
        include: Funda,
      });
      res.status(200).json({ conjunto });
    }
    if (producto === "Malla") {
      const conjunto = await Conjunto.findByPk(id, {
        include: Malla,
      });
      res.status(200).json({ conjunto });
    }
    if (producto === "Reloj") {
      const conjunto = await Conjunto.findByPk(id, {
        include: Reloj,
      });
      res.status(200).json({ conjunto });
    }
    if (producto === "Tablet") {
      const conjunto = await Conjunto.findByPk(id, {
        include: Tablet,
      });
      res.status(200).json({ conjunto });
    }
    if (producto === "Vidrio_Protector") {
      const conjunto = await Conjunto.findByPk(id, {
        include: Vidrio_Protector,
      });
      res.status(200).json({ conjunto });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const conjuntos = await Conjunto.findAll({
      include: [
        {
          model: Adaptador,
          as: "Adaptadors",
        },
        {
          model: Auricular,
          as: "Auriculars",
        },
        {
          model: Cable,
          as: "Cables",
        },
        {
          model: Cargador,
          as: "Cargadors",
        },
        {
          model: Celular,
          as: "Celulars",
        },
        {
          model: Computadora,
          as: "Computadoras",
        },
        {
          model: Fuente,
          as: "Fuentes",
        },
        {
          model: Funda,
          as: "Fundas",
        },
        {
          model: Malla,
          as: "Mallas",
        },
        {
          model: Reloj,
          as: "Relojs",
        },
        {
          model: Tablet,
          as: "Tablets",
        },
        {
          model: Vidrio_Protector,
          as: "Vidrio_Protectors",
        },
      ],
    });
    const conjuntosSinArraysVacios = conjuntos.map((conjunto) => {
      //Mapeo los objetos y elimino cuando haya arrays vacios dentro de dataValues para mejor manejo en el front
      for (const clave in conjunto.dataValues) {
        if (
          Array.isArray(conjunto.dataValues[clave]) &&
          conjunto.dataValues[clave].length === 0
        ) {
          delete conjunto.dataValues[clave];
        }
      }
      return conjunto;
    });

    res.status(200).json(conjuntosSinArraysVacios);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.put("/", async (req, res, next) => {
  const { producto, marca, modelo, estado, cantidad, precio } = req.body;

  try {
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Conjunto.destroy({
      where: {
        id: id,
      },
    });
    res.send("Conjunto borrado de la base de datos.").status(200);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

router.post("/", async (req, res, next) => {
  const objeto = req.body;
  console.log(objeto);
  try {
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

module.exports = router;
