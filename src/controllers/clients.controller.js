import { pooldb } from "../db.js";

export const createClient = async (req, res) => {
    try {
      let {
        id_producto,
        nombre
      } = req.body;
  
      let [rows] = await pooldb.query(
        "insert into tbl_cliente (id_producto, nombre) values (?, ?)",
        [
            id_producto,
            nombre
        ]
      );
  
      console.log(rows);
  
      res.send({
        id: rows.insertId,
        id_producto,
        nombre
      });
    } catch (error) {
        const loQueEnvian = req.body;
        res.status(500).send({loQueEnvian, error});

      /*
      return res.status(500).json({
        message: "Something goes wrong",
      });
      */
    }
  };

  
export const getClients = async (req, res) => {
    try {
        const [rows] = await pooldb.query("SELECT * FROM tbl_cliente");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const getClient = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pooldb.query("SELECT * FROM tbl_cliente WHERE id = ?", [
            id,
        ]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Cliente not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const updateClient = async (req, res) => {
    try {
      let { id } = req.params;
      let {
        id_producto,
        nombre
      } = req.body;
  
      let [rows] = await pooldb.query(
        "update tbl_cliente set id_producto = ?, nombre = ? where id = ?",
        [
          id_producto,
          nombre,
          id
        ]
      );
  
      if (rows.affectedRows < 1)
        return res.status(404).json({
          message: "Cliente not found",
        });
  
      let [result] = await pooldb.query("select * from tbl_cliente where id = ?", [id]);
  
      res.json(result[0]);
  
    } catch (error) {
      return res.status(500).json({
        message: "Something goes wrong",
      });
    }
  };

export const deleteClient = async (req, res) => {
    try {
      let [rows] = await pooldb.query("delete from tbl_client where id = ?", [
        req.params.id,
      ]);
  
      if (rows.affectedRows < 1)
        return res.status(404).json({
          message: "Ticket not found",
        });
  
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({
        message: "Something goes wrong", error
      });
    }
  };