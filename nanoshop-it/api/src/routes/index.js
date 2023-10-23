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

const router = Router();

router.use("/productos/adaptadores", modelAdaptador);
router.use("/productos/auriculares", modelAuricular);
router.use("/productos/cables", modelCable);
router.use("/productos/cargadores", modelCargador);
router.use("/productos/celulares", modelCelular);
router.use("/productos/computadoras", modelComputadora);
router.use("/productos/fuentes", modelFuente);
router.use("/productos/fundas", modelFunda);
router.use("/productos/mallas", modelMalla);
router.use("/productos/relojes", modelReloj);
router.use("/productos/tablets", modelTablet);
router.use("/productos/vidrios_protectores", modelVidrio);
router.use("/productos", modelProductos);

module.exports = router;
