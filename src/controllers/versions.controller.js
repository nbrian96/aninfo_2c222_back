import { pooldb } from "../db.js";

export const getVersions = async (req, res) => {
	try {
		let [rows] = await pooldb.query("select * from tbl_version");
		res.json(rows);
	} catch (error) {
		res.status(500).send({ error });
	}
};

export const getVersion = async (req, res) => {
	try {
		let [rows] = await pooldb.query("select * from tbl_version where id = ?", [
			req.params.id,
		]);

		if (rows.length <= 0)
			return res.status(404).json({
				message: "Version not found",
			});

		res.json(rows[0]);
	} catch (error) {
		res.status(500).send({ error });
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
		res.status(500).send({ error });
	}
};

export const createVersion = async (req, res) => {
	try {
		let {
			nombre,
			fecha_lanzamiento
		} = req.body;

		let [rows] = await pooldb.query(
			"insert into tbl_version set ?",
			{
				nombre: nombre,
				fecha_lanzamiento: fecha_lanzamiento
			}
		);

		res.send({
			id: rows.insertId,
			nombre,
			fecha_lanzamiento
		});
	} catch (error) {
		const loQueEnvian = req.body;
		res.status(500).send({ loQueEnvian, error });
	}
};

export const updateVersion = async (req, res) => {
	try {
		let { id } = req.params;

		let [rows] = await pooldb.query("UPDATE tbl_version SET ? WHERE id = ?", [req.body, id]);

		if (rows.affectedRows < 1)
			return res.status(404).json({
				message: "Version not found",
			});

		let [result] = await pooldb.query("select * from tbl_version where id = ?", [id]);

		res.json(result[0]);

	} catch (error) {
		const loQueEnvian = req.body;
		res.status(500).send({ loQueEnvian, error });
	}
};