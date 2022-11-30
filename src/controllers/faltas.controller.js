import { pooldb } from "../db.js";

export const getFaltas = async (req, res) => {
    try {
      const [rows] = await pooldb.query("SELECT * FROM tbl_faltas");
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const getFalta = async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pooldb.query("SELECT * FROM tbl_faltas WHERE id = ?", [
        id,
      ]);
  
      if (rows.length <= 0) {
        return res.status(404).json({ message: "Falta not found" });
      }
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const deleteFalta = async (req, res) => {
    try {
      const { id } = req.params.id;
      const [rows] = await pooldb.query("DELETE FROM tbl_faltas WHERE id = ?", [id]);
  
      if (rows.affectedRows <= 0) {
        return res.status(404).json({ message: "Falta not found" });
      }
  
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const createFalta = async (req, res) => {
    try {
        const { legajo, fecha, justificante } = req.body;

        const [rows] = await pooldb.query(
          "INSERT INTO tbl_horas (legajo, fecha, justificante) VALUES (?, ?, ?)",
          [legajo, fecha, justificante]
        );
        res.status(201).json({ id: rows.insertId, legajo, fecha, justificante });
      } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
      }
};