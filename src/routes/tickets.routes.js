import { Router } from "express";
import {
	getTickets,
	getTicket,
	createTicket,
	updateTicket,
	deteleTicket,
} from "../controllers/tickets.controller.js";

const router = Router();

router.get("/tickets", getTickets);

router.get("/tickets/:id", getTicket);

router.post("/tickets", createTicket);

router.put("/tickets/:id", updateTicket);

router.delete("/tickets/:id", deteleTicket);

export default router;
