import { Router } from "express";
import {
	getFaltas,
	getFalta,
    deleteFalta,
    createFalta,
    getFaltasEmpleado,
} from "../controllers/faltas.controller.js";

const router = Router();

router.get("/faltas", getFaltas);

router.get("/faltas/:id", getFalta);

router.post("/faltas", createFalta);

router.delete("/faltas/:id", deleteFalta);

router.get("/faltas/empleado/:legajo_empleado", getFaltasEmpleado);

export default router;
