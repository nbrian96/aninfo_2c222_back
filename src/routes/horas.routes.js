import { Router } from "express";
import {
	getHoras,
	getHora,
	deleteHora,
	createHora,
	updateHoras,
	getHoraEmpleado,
} from "../controllers/horas.controller.js";

const router = Router();

router.get("/horas", getHoras);

router.get("/horas/:id", getHora);

router.post("/horas", createHora);

router.put("/horas/:id", updateHoras);

router.delete("/horas/:id", deleteHora);

router.get("/horas/empleado/:legajo", getHoraEmpleado);

export default router;
