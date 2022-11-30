import { pooldb } from "../db.js";

export const getTickets = async (req, res) => {
  try {
    let [rows] = await pooldb.query("select * from tbl_ticket");
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
    let [rows] = await pooldb.query("select * from tbl_ticket where id = ?", [
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
    let {
      id_responsable,
      severidad,
      estado,
      titulo,
      descripcion,
      id_cliente,
      medio_contacto,
      dato_contacto,
      id_producto,
      fecha_emision,
      fecha_resolucion
    } = req.body;

    let [rows] = await pooldb.query(
      "insert into tbl_ticket (id_responsable,severidad,estado,titulo,descripcion,id_cliente,medio_contacto,dato_contacto,id_producto,fecha_emision,fecha_resolucion) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id_responsable,
        severidad,
        estado,
        titulo,
        descripcion,
        id_cliente,
        medio_contacto,
        dato_contacto,
        id_producto,
        fecha_emision,
        fecha_resolucion
      ]
    );

    console.log(rows);
    res.send({
      id: rows.insertId,
      id_responsable,
      severidad,
      estado,
      titulo,
      descripcion,
      id_cliente,
      medio_contacto,
      dato_contacto,
      id_producto,
      fecha_emision,
      fecha_resolucion
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const deteleTicket = async (req, res) => {
  try {
    let [rows] = await pooldb.query("delete from tbl_ticket where id = ?", [
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
  try {
    let { id } = req.params;
    let {
      id_responsable,
      severidad,
      estado,
      titulo,
      descripcion,
      id_cliente,
      medio_contacto,
      dato_contacto,
      id_producto,
      fecha_emision,
      fecha_resolucion
    } = req.body;

    let [rows] = await pooldb.query(
      "update tbl_ticket set id_responsable = ?,severidad = ?,estado = ?,titulo = ?,descripcion = ?,id_cliente = ?,medio_contacto = ?,dato_contacto = ?,id_producto = ?,fecha_emision = ?,fecha_resolucion = ?  where id = ?",
      [
        id_responsable,
        severidad,
        estado,
        titulo,
        descripcion,
        id_cliente,
        medio_contacto,
        dato_contacto,
        id_producto,
        fecha_emision,
        fecha_resolucion,
        id
      ]
    );

    if (rows.affectedRows < 1)
      return res.status(404).json({
        message: "Ticket not found",
      });

    let [result] = await pooldb.query("select * from tbl_ticket where id = ?", [id]);

    res.json(result[0]);

  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
