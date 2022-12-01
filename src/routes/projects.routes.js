import { Router } from "express";

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

export default router;
