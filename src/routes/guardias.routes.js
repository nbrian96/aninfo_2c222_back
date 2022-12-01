import { Router } from "express";
import {
    getGuardias,
    getGuardia,
    deleteGuardia,
    createGuardia,
    getGuardiaEmpleado,
} from "../controllers/guardias.controller.js";

const router = Router();

router.get("/guardias", getGuardias);

router.get("/guardias/:id", getGuardia);

router.post("/guardias", createGuardia);

router.delete("/guardias/:id", deleteGuardia);

router.get("/guardias/empleado/:legajo", getGuardiaEmpleado);

export default router;