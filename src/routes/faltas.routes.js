import { Router } from "express";
import {
	getFaltas,
	getFalta,
    deleteFalta,
    createFalta,
} from "../controllers/faltas.controller.js";

const router = Router();

router.get("/faltas", getFaltas);

router.get("/faltas/:id", getFalta);

router.post("/faltas", createFalta);

router.delete("/faltas/:id", deleteFalta);

export default router;
