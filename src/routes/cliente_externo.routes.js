import { Router } from "express";
import {
    getClientsExt,

} from "../controllers/cliente_externo.controller.js";

const router = Router();

router.get("/clients_ext", getClientsExt);

export default router;
