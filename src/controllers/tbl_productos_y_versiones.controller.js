import { pooldb } from "../db.js";

export const getProdVersion = async (req, res) => {

	try {		let [rows] = await pooldb.query("select * from tbl_productos_y_versiones");

		res.json(rows);

	} catch (error) {

		res.status(500).send({ error });

	}

};

export const getProdVersion = async (req, res) => {

	try {

		let [rows] = await pooldb.query("select * from tbl_productos_y_versiones where id = ?", [

			req.params.id,

		]);

		if (rows.length <= 0)

			return res.status(404).json({

				message: "Not found",

			});

		res.json(rows[0]);

	} catch (error) {

		res.status(500).send({ error });

	}

};

export const getProd = async (req, res) => {

	try {

		let [rows] = await pooldb.query("select * from tbl_productos_y_versiones where producto_id = ?", [

			req.params.id,

		]);

		if (rows.length <= 0)

			return res.status(404).json({

				message: "Not found",

			});

		res.json(rows);

	} catch (error) {

		res.status(500).send({ error });

	}

};

export const deteleProdVersion = async (req, res) => {

	try {

		let [rows] = await pooldb.query("delete from tbl_productos_y_versiones where id = ?", [

			req.params.id,

		]);

		if (rows.affectedRows < 1)

			return res.status(404).json({

				message: "Not found",

			});

		res.sendStatus(204);

	} catch (error) {

		res.status(500).send({ error });

	}

};

export const createProdVersion = async (req, res) => {

	try {

		let {producto_id,version_id} = req.body;

		let [rows] = await pooldb.query(

			"insert into tbl_productos_y_versiones set ?",

			{

				producto_id: producto_id,
				version_id: version_id

			}

		);

		res.send({

			id: rows.insertId,producto_id, version_id 

		});

	} catch (error) {

		const loQueEnvian = req.body;

		res.status(500).send({ loQueEnvian, error });

	}
};
	
