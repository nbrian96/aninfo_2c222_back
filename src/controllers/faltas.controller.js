import { pooldb } from "../db.js";

export const getFaltas = async (req, res) => {
    try {
      const [rows] = await pooldb.query("SELECT * FROM tbl_faltas");
      res.json(rows);
    } catch (error) {
      const loQueEnvian = req.body;
      res.status(500).send({loQueEnvian});
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
      const loQueEnvian = req.body;
      res.status(500).send({loQueEnvian});
    }
};

export const deleteFalta = async (req, res) => {
    try {
      let [rows] = await pooldb.query("DELETE FROM tbl_faltas WHERE id = ?", [req.params.id, ]);
  
      if (rows.affectedRows < 1) {
        return res.status(404).json({ message: "Falta not found" });
      }
  
      res.sendStatus(204);
    } catch (error) {
      const loQueEnvian = req.body;
      res.status(500).send({loQueEnvian});
    }
};

export const createFalta = async (req, res) => {
    try {
        let { legajo_empleado, fecha, justificante } = req.body;

        let [rows] = await pooldb.query(
          "INSERT INTO tbl_faltas (legajo_empleado, fecha, justificante) VALUES (?, ?, ?)",
          [legajo_empleado, fecha, justificante]
        );
        res.status(201).json({ id: rows.insertId, legajo, fecha, justificante });
      } catch (error) {
        const loQueEnvian = req.body;
        res.status(500).send({loQueEnvian});
      }
};

export const getFaltasEmpleado = async (req, res) => {
  try {
    let { legajo_empleado } = req.params;
    let [rows] = await pooldb.query("SELECT * FROM tbl_faltas WHERE legajo_empleado = ?", [
      legajo_empleado,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Falta not found" });
    }

    res.json(rows);
  } catch (error) {
    const loQueEnvian = req.body;
    res.status(500).send({ loQueEnvian });
  }
};