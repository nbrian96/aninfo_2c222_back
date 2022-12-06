import { pooldb } from "../db.js";

export const getTareas = async (req, res) => {
	try {
		let [rows] = await pooldb.query("select * from tbl_tarea");
		res.json(rows);
	} catch (error) {
		return res.status(500).json({
			message: "Something goes wrong",
		});
	}
};

export const getTarea = async (req, res) => {
	try {
		// req.params -> guarda todos los parametros enviados
		let [rows] = await pooldb.query("select * from tbl_tarea where id = ?", [
			req.params.id,
		]);

		if (rows.length <= 0)
			return res.status(404).json({
				message: "Tarea not found",
			});

		res.json(rows[0]);
	} catch (error) {
		return res.status(500).json({
			message: "Something goes wrong",
		});
	}
};

export const deleteTarea = async (req, res) => {
	try {
		await pooldb.query("delete from tbl_horas where id_tarea = ?", [req.params.id,]);
		let [rows] = await pooldb.query("delete from tbl_tarea where id = ?", [req.params.id,]);

		if (rows.affectedRows < 1)
			return res.status(404).json({
				message: "Tarea not found",
			});

		res.sendStatus(204);
	} catch (error) {
		return res.status(500).send(error);
	}
};

export const createTarea = async (req, res) => {
	/*try {
		let {
			id_proyecto,
			legajo_recurso,
			estado,
			descripcion,
			horas_estimadas,
			horas_reales,
			fecha_fin,
			fecha_inicio,
			prioridad,
		} = req.body;

		let [rows] = await pooldb.query(
			"insert into tbl_tarea SET ?",
			{
				id_proyecto,
				legajo_recurso,
				estado,
				descripcion,
				horas_estimadas,
				horas_reales,
				fecha_fin,
				fecha_inicio,
				prioridad,
			});

		res.send({
			id: rows.insertId,
			id_proyecto,
			legajo_recurso,
			estado,
			descripcion,
			horas_estimadas,
			horas_reales,
			fecha_fin,
			fecha_inicio,
			prioridad,
		});
	} catch (error) {
		return res.status(500).send(error);
	}*/
	return saveTarea(req, res);
};

const saveTarea = async (req, res) => {
	try {
		let {
			id_proyecto,
			legajo_recurso,
			estado,
			descripcion,
			horas_estimadas,
			horas_reales,
			fecha_fin,
			fecha_inicio,
			prioridad,} = req.body;

		let [rows] = await pooldb.query(
			"insert into tbl_tarea SET ?",
			{
				id_proyecto,
				legajo_recurso,
				estado,
				descripcion,
				horas_estimadas,
				horas_reales,
				fecha_fin,
				fecha_inicio,
				prioridad,
			});

		res.status(200).json({
			id: rows.insertId,
			id_proyecto,
			legajo_recurso,
			estado,
			descripcion,
			horas_estimadas,
			horas_reales,
			fecha_fin,
			fecha_inicio,
			prioridad,
		});
	} catch (error) {
		return res.status(500).send(error);
	}
}

export const createSubtarea = async (req, res) => {
	try{
		let { id } = req.params;
		let {
			id_proyecto,
			legajo_recurso,
			estado,
			descripcion,
			horas_estimadas,
			horas_reales,
			fecha_fin,
			fecha_inicio,
			prioridad,
		} = req.body;

		let [rows] = await pooldb.query(
			"insert into tbl_tarea SET ?",
			{
				id_proyecto,
				legajo_recurso,
				estado,
				descripcion,
				horas_estimadas,
				horas_reales,
				fecha_fin,
				fecha_inicio,
				prioridad,
			});

		await pooldb.query("insert into tbl_subtarea SET ?",{
			id_tarea_padre: id,
			id_tarea_hija: rows.insertId,
		})

		return res.status(200).json({
			id: rows.insertId,
			id_proyecto,
			legajo_recurso,
			estado,
			descripcion,
			horas_estimadas,
			horas_reales,
			fecha_fin,
			fecha_inicio,
			prioridad,
		});
	} catch (error){
		return res.status(500).send(error);
	}
}

export const updateTarea = async (req, res) => {
	try {
		let { id } = req.params;

		let [rows] = await pooldb.query("UPDATE tbl_tarea SET ? WHERE id = ?", [req.body, id]);

		if (rows.affectedRows < 1)
			return res.status(404).json({
				message: "Tarea not found",
			});

		let [result] = await pooldb.query("select * from tbl_tarea where id = ?", [id]);

		res.json(result[0]);

	} catch (error) {
		return res.status(500).json(error);
	}
};