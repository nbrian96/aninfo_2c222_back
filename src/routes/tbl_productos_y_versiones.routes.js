import { Router } from "express";

import {

	getProdVersions, getProdVersion,

	createProdVersion, getProd,

	deteleProdVersion,

} from "../controllers/tbl_productos_y_versiones.controller.js";

const router = Router();

router.get("/prodversions", getProdVersions);

router.get("/prodversions/:id", getProdVersion);

router.post("/prodversions", createProdVersion);

router.get("/prodversions/producto/:id", getProd);

router.delete("/prodversions/:id", deteleProdVersion);

export default router;
