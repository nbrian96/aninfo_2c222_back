import { Router } from "express";
import {
	getVersions,
	getVersion,
	createVersion,
	updateVersion,
	deteleVersion,
} from "../controllers/versions.controller.js";

const router = Router();

router.get("/versions", getVersions);

router.get("/versions/:id", getVersion);

router.post("/versions", createVersion);

router.put("/versions/:id", updateVersion);

router.delete("/versions/:id", deteleVersion);

export default router;
