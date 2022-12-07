import { Router } from "express";
import {
    getRecursosExt,

} from "../controllers/recurso_externo.controller.js";

const router = Router();

router.get("/recursos_ext", getRecursosExt);

export default router;
