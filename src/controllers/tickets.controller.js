import { pooldb } from "../db.js";

export const getTickets = async (req, res) => {
	try {
		let [rows] = await pooldb.query("select * from tickets");
		res.json(rows);
	} catch (error) {
		return res.status(500).json({
			message: "Something goes wrong",
		});
	}
};

export const getTicket = async (req, res) => {
	try {
		// req.params -> guarda todos los parametros enviados
		let [rows] = await pooldb.query("select * from tickets where id = ?", [
			req.params.id,
		]);

		if (rows.length <= 0)
			return res.status(404).json({
				message: "Ticket not found",
			});

		res.json(rows[0]);
	} catch (error) {
		return res.status(500).json({
			message: "Something goes wrong",
		});
	}
};

export const createTicket = async (req, res) => {
	try {
		let today = new Date();

		let day = today.getDate(); // `getDate()` devuelve el día del mes (del 1 al 31)
		let month = today.getMonth() + 1; // `getMonth()` devuelve el mes (de 0 a 11)
		let year = today.getFullYear(); // `getFullYear()` devuelve el año completo

		let fechaDeEmision = `${year}-${month}-${day}`;
		let { name, descripcion } = req.body;

		let [rows] = await pooldb.query(
			"insert into tickets (name, descripcion, fechaDeEmision) values (?, ?, ?)",
			[name, descripcion, fechaDeEmision]
		);

		res.send({
			id: rows.insertId,
			name,
			descripcion,
			fechaDeEmision,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Something goes wrong",
		});
	}
};

export const deteleTicket = async (req, res) => {
	try {
		let [rows] = await pooldb.query("delete from tickets where id = ?", [
			req.params.id,
		]);

		if (rows.affectedRows < 1)
			return res.status(404).json({
				message: "Ticket not found",
			});

		res.sendStatus(204);
	} catch (error) {
		return res.status(500).json({
			message: "Something goes wrong",
		});
	}
};

export const updateTicket = async (req, res) => {
	let { id } = req.params;
	let { name, descripcion } = req.body;

	let [rows] = await pooldb.query(
		"update tickets set name = ?, descripcion = ?  where id = ?",
		[name, descripcion, id]
	);

	if (rows.affectedRows < 1)
		return res.status(404).json({
			message: "Ticket not found",
		});

	let [result] = await pooldb.query("select * from tickets where id = ?", [id]);

	res.json(result[0]);
};
