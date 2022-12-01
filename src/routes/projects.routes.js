import { Router } from "express";
import {
	getProjects,
	getByProjectId,
	createProject,
	deleteProject,
	updateProject,
} from "../controllers/projects.controller.js";

const router = Router();

router.get('/proyectos/:id', getByProjectId);

router.get('/proyectos', getProjects);

router.post('/proyectos', createProject);

router.put('/proyectos/:id', updateProject);

router.delete('/proyectos/:id', deleteProject);

export default router;