import { Router } from "express";
import {
	getTareas,
	getTarea,
	createTarea,
	updateTarea,
	deleteTarea,
	getTareaByProjectId,
	createSubtarea,
	getSubtareas
} from "../controllers/tareas.controller.js";

const router = Router();

router.get("/tareas", getTareas);

router.get("/tareas/:id", getTarea);

router.get("/tareas/proyecto/:id", getTareaByProjectId);

router.post("/tareas", createTarea);

router.put("/tareas/:id", updateTarea);

router.post("/tareas/:id/subtareas", createSubtarea);

router.get("/tareas/:id/subtareas", getSubtareas);

router.delete("/tareas/:id", deleteTarea);

export default router;
