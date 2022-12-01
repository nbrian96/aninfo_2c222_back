import { Router } from "express";
import {
	getHoras,
	getHora,
	deleteHora,
	createHora,
	updateHoras,
	getHoraEmpleado, getHorasExtraTotalesEmpleado,
} from "../controllers/horas.controller.js";

const router = Router();

router.get("/horas", getHoras);

router.get("/horas/:id", getHora);

router.post("/horas", createHora);

router.put("/horas/:id", updateHoras);

router.delete("/horas/:id", deleteHora);

router.get("/horas/empleado/:legajo_empleado", getHoraEmpleado);

router.get("/horas/empleado/:legajo_empleado", getHorasTotalesEmpleado);

router.get("/horas/empleado/:legajo_empleado", getHorasExtraTotalesEmpleado);

export default router;
