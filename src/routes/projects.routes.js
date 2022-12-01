import { Router } from "express";
import {
	getProjects,
	getProject,
	createProject,
	deleteProject,
	updateProject,
	//getByProjectName,
} from "../controllers/projects.controller.js";

const router = Router();

router.get('/proyectos/:id', getProject);

//router.get('/proyectos/:nombre', getByProjectName);

router.get('/proyectos', getProjects);

router.post('/proyectos', createProject);

router.put('/proyectos/:id', updateProject);

router.delete('/proyectos/:id', deleteProject);

export default router;