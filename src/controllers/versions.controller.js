import { pooldb } from "../db.js";

export const getVersions = async (req, res) => {
	try {
		let [rows] = await pooldb.query("select * from tbl_version");
		res.json(rows);
	} catch (error) {
		return res.status(500).json({
			message: "Something goes wrong",
		});
	}
};

export const getVersion = async (req, res) => {
	try {
		// req.params -> guarda todos los parametros enviados
		let [rows] = await pooldb.query("select * from tbl_version where id = ?", [
			req.params.id,
		]);

		if (rows.length <= 0)
			return res.status(404).json({
				message: "Version not found",
			});

		res.json(rows[0]);
	} catch (error) {
		return res.status(500).json({
			message: "Something goes wrong",
		});
	}
};

export const deteleVersion = async (req, res) => {
	try {
		let [rows] = await pooldb.query("delete from tbl_version where id = ?", [
			req.params.id,
		]);

		if (rows.affectedRows < 1)
			return res.status(404).json({
				message: "Version not found",
			});

		res.sendStatus(204);
	} catch (error) {
		return res.status(500).json({
			message: "Something goes wrong",
		});
	}
};
/*
  `nombre` VARCHAR(45) NULL,
  `fecha_lanzamiento` DATETIME NULL,
  */
export const createVersion = async (req, res) => {
	try {
		let {
			nombre,
			fecha_lanzamiento
		} = req.body;

		let [rows] = await pooldb.query(
			"insert into tbl_version (id_proyecto,estado) values (?, ?)",
			[
				nombre,
			fecha_lanzamiento
			]
		);

		console.log(rows);
		res.send({
			id: rows.insertId,
			id_proyecto,
			estado,
			descripcion,
			horas_estimadas
		});
	} catch (error) {
		return res.status(500).json({
			message: "Something goes wrong",
		});
	}
};

export const updateVersion = async (req, res) => {
	try {
		let { id } = req.params;

		let {
			id_proyecto,
			estado,
			descripcion,
			horas_estimadas
		} = req.body;

		let [rows] = await pooldb.query(
			"update tbl_version set id_proyecto = ?,estado = ?,descripcion = ?,horas_estimadas = ?  where id = ?",
			[
				id_proyecto,
				estado,
				descripcion,
				horas_estimadas,
				id
			]
		);

		if (rows.affectedRows < 1)
			return res.status(404).json({
				message: "Version not found",
			});

		let [result] = await pooldb.query("select * from tbl_version where id = ?", [id]);

		res.json(result[0]);

	} catch (error) {
		return res.status(500).json({
			message: "Something goes wrong",
		});
	}
};