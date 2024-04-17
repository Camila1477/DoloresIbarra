/*import { Router } from "express";
import {
  agregar,
  getCompras,
  getTabla,
  getComprasControl,
  getFormularios,
  getFormulario,
  createFormulario,
  deleteFormulario,
  updateFormulario,
  comprasControl,
} from "../controllers/tasks.controllers.js";

const router = Router();

router.post("/agregar", agregar);
router.get("/tabla", getTabla);
router.get("/comprasControl/:id", getComprasControl);
router.post("/comprasControl/:id", comprasControl);
router.get("/formulario", getFormularios);
router.get("/compras", getCompras);
router.get("/formulario/:id", getFormulario);
router.post("/formulario", createFormulario);
router.post("/actualizarFormulario/:id", updateFormulario);
router.get("/borrarFormulario/:id", deleteFormulario);

export default router;*/

import { Router } from "express";
import {
  getTabla,
  getCompras,
  getFormularios,
  getFormulario,
  createFormulario,
  deleteFormulario,
  updateFormulario,
  comprarProducto,
} from "../controllers/tasks.controllers.js";

const router = Router();

router.get("/tabla", getTabla);
router.get("/compras", getCompras);
router.get("/formulario", getFormularios);
router.get("/formulario/:id", getFormulario);
router.post("/formulario", createFormulario);
router.post("/actualizarFormulario/:id", updateFormulario);
router.get("/borrarFormulario/:id", deleteFormulario);
router.post("/comprar", comprarProducto);

export default router;
