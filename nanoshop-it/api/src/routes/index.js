const { Router } = require("express");

const modelAdaptador = require("./Adaptadores.js");
const modelAuricular = require("./Auriculares.js");
const modelCable = require("./Cables.js");
const modelCargador = require("./Cargadores.js");
const modelCelular = require("./Celulares.js");
const modelComputadora = require("./Computadoras.js");
const modelFuente = require("./Fuentes.js");
const modelFunda = require("./Fundas.js");
const modelMalla = require("./Mallas.js");
const modelReloj = require("./Relojes.js");
const modelTablet = require("./Tablets.js");
const modelVidrio = require("./Vidrios_Protectores.js");
const modelProductos = require("./Productos.js");
const modelModelos = require("./ModelosDD.js");
const modelConjunto = require("./Conjuntos.js");

const router = Router();

router.use("/adaptadores", modelAdaptador);
router.use("/auriculares", modelAuricular);
router.use("/cables", modelCable);
router.use("/cargadores", modelCargador);
router.use("/celulares", modelCelular);
router.use("/computadoras", modelComputadora);
router.use("/fuentes", modelFuente);
router.use("/fundas", modelFunda);
router.use("/mallas", modelMalla);
router.use("/relojes", modelReloj);
router.use("/tablets", modelTablet);
router.use("/vidrios_protectores", modelVidrio);
router.use("/productos", modelProductos);
router.use("/conjuntos", modelConjunto);
router.use("/modelos", modelModelos);

module.exports = router;
