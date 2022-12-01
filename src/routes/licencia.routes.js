import { Router } from "express";
import {
	getLicencias,
	getLicencia,
	deleteLicencia,
	createLicencia,
	getLicenciaEmpleado,
} from "../controllers/licencia.controller.js";

const router = Router();

router.get("/licencia", getLicencias);

router.get("/licencia/:id", getLicencia);

router.post("/licencia", createLicencia);

router.delete("/licencia/:id", deleteLicencia);

router.get("/licencia/empleado/:legajo_empleado", getLicenciaEmpleado);

export default router;
