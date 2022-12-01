import { Router } from "express";
import {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} from "../controllers/employees.controller.js";

const router = Router();

router.get("/employees", getEmployees);

router.get("/employees/:legajo", getEmployee);

router.post("/employees", createEmployee);

router.put("/employees/:legajo", updateEmployee);

router.delete("/employees/:legajo", deleteEmployee);

export default router;