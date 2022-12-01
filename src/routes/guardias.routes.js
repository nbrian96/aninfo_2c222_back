import { Router } from "express";
import {
    getGuardias,
    getGuardia,
    deleteGuardia,
    createGuardia,
    getGuardiaEmpleado,
    getCantGuardiasEmpleado,
} from "../controllers/guardias.controller.js";

const router = Router();

router.get("/guardias", getGuardias);

router.get("/guardias/:id", getGuardia);

router.post("/guardias", createGuardia);

router.delete("/guardias/:id", deleteGuardia);

router.get("/guardias/empleado/:legajo_empleado", getGuardiaEmpleado);

router.get("/guardias/cant/empleado/:legajo_empleado", getCantGuardiasEmpleado);

export default router;
