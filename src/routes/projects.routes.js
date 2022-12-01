import { Router } from "express";
import {
	getProjects,
	getByProjectId,
	createProject,
	deleteProject,
	//updateProject
} from "../controllers/projects.controller.js";

const router = Router();

router.get('/proyectos/:id', getByProjectId);

router.get('/proyectos', getProjects);

router.post('/proyectos', createProject);

//router.put('/proyectos/:id', updateProject);

router.delete('/proyectos/:id', deleteProject);

export default router;

/*
router.get('/editProject/:id', (req,res) => {
	res.send(req.params);
})

router.get('/eliminarProject/:id', (req,res) => {
	res.send(req.params);
})

router.get('/editTarea/:id', (req,res) => {
	res.send(req.params);
})

router.get('/eliminarTarea/:id', (req,res) => {
	res.send(req.params);
})

router.get('/projectView/:id', (req,res) => {
	res.send(req.params);
})

router.get('/tareaView/:id', (req,res) => {
	res.send(req.params);
})
*/