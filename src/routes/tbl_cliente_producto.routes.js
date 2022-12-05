import { Router } from "express";
import {
	getClienteProds,
	getClienteProd,
	deleteClienteProd,
	createClienteProd,
	updateClienteProd,
	getProdWithCliente,
} from "../controllers/tbl_cliente_producto.controller.js";

const router = Router();

router.get("/cliente_prod", getClienteProds);

router.get("/cliente_prod/:id", getClienteProd);

router.get("/cliente_prod/cliente/:id", getProdWithCliente);

router.delete("/cliente_prod/:id", deleteClienteProd);

router.post("/cliente_prod", createClienteProd);

router.put("/cliente_prod/:id", updateClienteProd);

export default router;