const { Router } = require("express");
const { Op, Modelos } = require("../db.js");

const router = Router();

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
  ModelosDD,
  Reloj,
  Tablet,
  Vidrio_Protector,
  ConjuntoDeProductos,
} = Modelos;

router.post("/", async (req, res) => {
  try {
    const { conjuntoProps, productoProps, cantidad } = req.body;

    try {
      //Creo la instancia del Conjunto Nuevo
      const conjunto = await ConjuntoDeProductos.create({
        producto: conjuntoProps.producto,
        marca: conjuntoProps.marca,
        modelo: conjuntoProps.modelo,
        cantidad: conjuntoProps.cantidad,
        precio: conjuntoProps.precio,
      });

      //Aca creo instancias de un producto en particular una cantidad de veces especifica (params) y las relaciono con la instancia de ConjuntoDeProductos creado antes.
      //Aca podria tal vez hacerlo de otra manera para no repetir el mismo codigo de las rutas post de los modelos

      try {
        if (conjuntoProps.producto === "Adaptador") {
          for (let i = 0; i < cantidad; i++) {
            try {
              var productoNuevo = await Adaptador.create({
                marca: productoProps.marca,
                modelo: productoProps.modelo,
                estado: productoProps.estado,
                tipo: productoProps.tipo,
                precio: productoProps.precio,
                informacion: productoProps.informacion,
              });
              conjunto.addAdaptador(productoNuevo);
            } catch (error) {
              res.status(500).send(error.message);
            }
          }
        } else if (conjuntoProps.producto === "Auricular") {
          for (let i = 0; i < cantidad; i++) {
            try {
              var productoNuevo = await Auricular.create({
                marca: productoProps.marca,
                modelo: productoProps.modelo,
                ficha: productoProps.ficha,
                inalambrico: productoProps.inalambrico,
                color: productoProps.color,
                estado: productoProps.estado,
                precio: productoProps.precio,
                informacion: productoProps.informacion,
              });
              conjunto.addAuricular(productoNuevo);
            } catch (error) {
              res.status(500).send(error.message);
            }
          }
        } else if (conjuntoProps.producto === "Cable") {
          for (let i = 0; i < cantidad; i++) {
            try {
              var productoNuevo = await Cable.create({
                marca: productoProps.marca,
                modelo: productoProps.modelo,
                ficha: productoProps.ficha,
                largo: productoProps.largo,
                color: productoProps.color,
                estado: productoProps.estado,
                precio: productoProps.precio,
                informacion: productoProps.informacion,
              });
              conjunto.addCable(productoNuevo);
            } catch (error) {
              res.status(500).send(error.message);
            }
          }
        } else if (conjuntoProps.producto === "Cargador") {
          for (let i = 0; i < cantidad; i++) {
            try {
              var productoNuevo = await Cargador.create({
                marca: productoProps.marca,
                modelo: productoProps.modelo,
                inalambrico: productoProps.inalambrico,
                deAuto: productoProps.deAuto,
                color: productoProps.color,
                estado: productoProps.estado,
                precio: productoProps.precio,
                informacion: productoProps.informacion,
              });
              conjunto.addCargador(productoNuevo);
            } catch (error) {
              res.status(500).send(error.message);
            }
          }
        } else if (conjuntoProps.producto === "Celular") {
          for (let i = 0; i < cantidad; i++) {
            try {
              var productoNuevo = await Celular.create({
                marca: productoProps.marca,
                modelo: productoProps.modelo,
                almacenamiento: productoProps.almacenamiento,
                color: productoProps.color,
                estado: productoProps.estado,
                bateria: productoProps.bateria,
                precio: productoProps.precio,
                informacion: productoProps.informacion,
              });
              conjunto.addCelular(productoNuevo);
            } catch (error) {
              res.status(500).send(error.message);
            }
          }
        } else if (conjuntoProps.producto === "Computadora") {
          for (let i = 0; i < cantidad; i++) {
            try {
              var productoNuevo = await Computadora.create({
                marca: productoProps.marca,
                modelo: productoProps.modelo,
                memoria: productoProps.memoria,
                almacenamiento: productoProps.almacenamiento,
                pantalla: productoProps.pantalla,
                color: productoProps.color,
                chip: productoProps.chip,
                estado: productoProps.estado,
                precio: productoProps.precio,
                informacion: productoProps.informacion,
              });
              conjunto.addComputadora(productoNuevo);
            } catch (error) {
              res.status(500).send(error.message);
            }
          }
        } else if (conjuntoProps.producto === "Fuente") {
          for (let i = 0; i < cantidad; i++) {
            try {
              var productoNuevo = await Fuente.create({
                marca: productoProps.marca,
                tipo: productoProps.tipo,
                precio: productoProps.precio,
                informacion: productoProps.informacion,
              });
              conjunto.addFuente(productoNuevo);
            } catch (error) {
              res.status(500).send(error.message);
            }
          }
        } else if (conjuntoProps.producto === "Funda") {
          for (let i = 0; i < cantidad; i++) {
            try {
              var productoNuevo = await Funda.create({
                marca: productoProps.marca,
                modelo: productoProps.modelo,
                tipo: productoProps.tipo,
                color: productoProps.color,
                precio: productoProps.precio,
                informacion: productoProps.informacion,
              });
              conjunto.addFunda(productoNuevo);
            } catch (error) {
              res.status(500).send(error.message);
            }
          }
        } else if (conjuntoProps.producto === "Malla") {
          for (let i = 0; i < cantidad; i++) {
            try {
              var productoNuevo = await Malla.create({
                marca: productoProps.marca,
                modelo: productoProps.modelo,
                inalambrico: productoProps.inalambrico,
                deAuto: productoProps.deAuto,
                color: productoProps.color,
                estado: productoProps.estado,
                precio: productoProps.precio,
                informacion: productoProps.informacion,
              });
              conjunto.addMalla(productoNuevo);
            } catch (error) {
              res.status(500).send(error.message);
            }
          }
        } else if (conjuntoProps.producto === "Reloj") {
          for (let i = 0; i < cantidad; i++) {
            try {
              var productoNuevo = await Reloj.create({
                marca: productoProps.marca,
                modelo: productoProps.modelo,
                color: productoProps.color,
                estado: productoProps.estado,
                precio: productoProps.precio,
                informacion: productoProps.informacion,
              });
              conjunto.addReloj(productoNuevo);
            } catch (error) {
              res.status(500).send(error.message);
            }
          }
        } else if (conjuntoProps.producto === "Tablet") {
          for (let i = 0; i < cantidad; i++) {
            try {
              var productoNuevo = await Tablet.create({
                marca: productoProps.marca,
                modelo: productoProps.modelo,
                almacenamiento: productoProps.almacenamiento,
                color: productoProps.color,
                pantalla: productoProps.pantalla,
                estado: productoProps.estado,
                precio: productoProps.precio,
                informacion: productoProps.informacion,
              });
              conjunto.addTablet(productoNuevo);
            } catch (error) {
              res.status(500).send(error.message);
            }
          }
        } else if (conjuntoProps.producto === "Vidrio_Protector") {
          for (let i = 0; i < cantidad; i++) {
            try {
              var productoNuevo = await Vidrio_Protector.create({
                marca: productoProps.marca,
                modelo: productoProps.modelo,
                color: productoProps.color,
                estado: productoProps.estado,
                precio: productoProps.precio,
                informacion: productoProps.informacion,
              });
              conjunto.addVidrio_Protector(productoNuevo);
            } catch (error) {
              res.status(500).send(error.message);
            }
          }
        }
      } catch (error) {
        console.log(
          "Error en la operacion: NO SE PUDO CREAR EL PRODUCTO",
          error.message
        );
      }
      res.status(200).send(conjunto);
    } catch (error) {
      res.send(
        "Error en la operacion: NO SE PUDO CREAR EL CONJUNTO" + error.message
      );
    }
  } catch (error) {
    res.send("Error en la operacion: " + error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const adaptadores = await ConjuntoDeProductos.findByPk(id, {
      //Aca incluyo los modelos Adaptadores que esten relacionados a este ConjuntoID
      include: Adaptador,
    });

    res.status(200).send(adaptadores);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const conjuntos = await ConjuntoDeProductos.findAll({
      // Consulto todos los Conjuntos y con el include extraigo ademas los modelos relacionados con cada uno de los conjuntos
      include:
        Adaptador ||
        Auricular ||
        Cable ||
        Cargador ||
        Fuente ||
        Funda ||
        Malla ||
        Reloj ||
        Tablet ||
        Vidrio_Protector,
    });
    res.status(200).send(conjuntos);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(500);
  }
});

module.exports = router;
