import { pooldb } from "../db.js";

export const getClienteProds = async (req, res) => {
	try {
		let [rows] = await pooldb.query("select * from tbl_cliente_producto");
		res.json(rows);
	} catch (error) {
		res.status(500).send({ error });
	}
};

export const getClienteProd = async (req, res) => {
	try {
		let [rows] = await pooldb.query("select * from tbl_cliente_producto where id = ?", [
			req.params.id,
		]);

		if (rows.length <= 0)
			return res.status(404).json({
				message: "Cliente/Producto not found",
			});

		res.json(rows[0]);
	} catch (error) {
		res.status(500).send({ error });
	}
};

export const getProdWithCliente = async (req, res) => {
	try {
		let [rows] = await pooldb.query("select * from tbl_cliente_producto where id_cliente = ?", [
			req.params.id,
		]);

		if (rows.length <= 0)
			return res.status(404).json({
				message: "Cliente/Producto not found",
			});

		res.json(rows);
	} catch (error) {
		res.status(500).send({ error });
	}
};

export const getClienteWithProd = async (req, res) => {
	try {
		let [rows] = await pooldb.query("select * from tbl_cliente_producto where id_producto = ?", [
			req.params.id,
		]);

		if (rows.length <= 0)
			return res.status(404).json({
				message: "Cliente/Producto not found",
			});

		res.json(rows);
	} catch (error) {
		res.status(500).send({ error });
	}
};


export const deleteClienteProd = async (req, res) => {
	try {
		let [rows] = await pooldb.query("delete from tbl_cliente_producto where id = ?", [
			req.params.id,
		]);

		if (rows.affectedRows < 1)
			return res.status(404).json({
				message: "Cliente/Producto not found",
			});

		res.sendStatus(204);
	} catch (error) {
		res.status(500).send({ error });
	}
};

export const createClienteProd = async (req, res) => {
	try {
		let {
			id_cliente,
			id_producto,
			id_version
		} = req.body;

		let [rows] = await pooldb.query(
			"insert into tbl_cliente_producto set ?",
			{
				id_cliente: id_cliente,
				id_producto: id_producto,
				id_version: id_version
			}
		);

		res.send({
			id: rows.insertId,
			id_cliente,
			id_producto,
			id_version
		});
	} catch (error) {
		const loQueEnvian = req.body;
		res.status(500).send({ loQueEnvian, error });
	}
};

export const updateClienteProd = async (req, res) => {
	try {
		let { id } = req.params;

		let {
			id_cliente,
			id_producto,
			id_version
		} = req.body;

		let [rows] = await pooldb.query(
			"update tbl_ticket set id_cliente = ?,id_producto = ?,id_version = ? where id = ?",
			[
				id_cliente,
				id_producto,
				id_version,
				id
			]
		);

		if (rows.affectedRows < 1)
			return res.status(404).json({
				message: "Cliente/Producto not found",
			});

		let [result] = await pooldb.query("select * from tbl_cliente_producto where id = ?", [id]);

		res.json(result[0]);

	} catch (error) {
		const loQueEnvian = req.body;
		res.status(500).send({ loQueEnvian, error });
	}
};