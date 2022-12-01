import { Router } from "express";

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

const router = Router();

router.get('/proyecto/:id', getByProjectId);

router.get('/proyecto', getProjects);

router.post('/proyecto', createProject);

router.put('/proyecto/:id', updateProject);

router.delete('/proyecto/:id', deleteProject);


export default router;
