import { Router } from "express";
import {
	getTareas,
	getTarea,
	createTarea,
	updateTarea,
	deteleTarea,
} from "../controllers/tareas.controller.js";

const router = Router();

router.get("/tareas", getTareas);

router.get("/tareas/:id", getTarea);

router.post("/tareas", createTarea);

router.put("/tareas/:id", updateTarea);

router.delete("/tareas/:id", deteleTarea);

export default router;
