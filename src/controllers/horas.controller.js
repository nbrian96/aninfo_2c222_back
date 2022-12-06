import { pooldb } from "../db.js";

export const getHoras = async (req, res) => {
  try {
    const [rows] = await pooldb.query("SELECT * FROM tbl_horas");
    res.json(rows);
  } catch (error) {
    const loQueEnvian = req.body;
    res.status(500).send({ loQueEnvian });
  }
};

export const getHora = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pooldb.query("SELECT * FROM tbl_horas WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Hora not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    const loQueEnvian = req.body;
    res.status(500).send({ loQueEnvian });
  }
};

export const getHoraEmpleado = async (req, res) => {
  try {
    let { legajo_empleado } = req.params;
    let [rows] = await pooldb.query("SELECT * FROM tbl_horas WHERE legajo_empleado = ?", [
      legajo_empleado,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Hora not found" });
    }

    res.json(rows);
  } catch (error) {
    const loQueEnvian = req.body;
    res.status(500).send({ loQueEnvian });
  }
};

export const getHorasTotalesEmpleado = async (req, res) => {
  try {
    let { legajo_empleado } = req.params;
    let [rows] = await pooldb.query("SELECT SUM(cant_horas) as horas_totales FROM tbl_horas WHERE legajo_empleado = ?", [
      legajo_empleado,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Horas not found" });
    }

    res.json(rows);
  } catch (error) {
    const loQueEnvian = req.body;
    res.status(500).send({ loQueEnvian });
  }
};

export const getHorasExtraTotalesEmpleado = async (req, res) => {
  try {
    let { legajo_empleado } = req.params;
    let [rows] = await pooldb.query("SELECT SUM(extra) as horas_extra FROM tbl_horas WHERE legajo_empleado = ?", [
      legajo_empleado,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Horas not found" });
    }

    res.json(rows);
  } catch (error) {
    const loQueEnvian = req.body;
    res.status(500).send({ loQueEnvian });
  }
};

export const deleteHora = async (req, res) => {
  try {
    const { id } = req.params.id;
    const [rows] = await pooldb.query("DELETE FROM tbl_horas WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Hora not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    const loQueEnvian = req.body;
    res.status(500).send({ loQueEnvian });
  }
};

export const updateHoras = async (req, res) => {
  let { id } = req.params;
  let { id_tarea, cant_horas } = req.body;

  let [rows] = await pooldb.query(
    "update tbl_horas set id_tarea = ?, cant_horas = ?  where id = ?",
    [id_tarea, cant_horas, id]
  );

  if (rows.affectedRows < 1)
    return res.status(404).json({
      message: "Hora not found",
    });

  let [result] = await pooldb.query("select * from tbl_horas where id = ?", [id]);

  res.json(result[0]);
};

export const createHora = async (req, res) => {
  console.log(req.body);
  try {
    let { legajo_empleado, id_tarea, cant_horas, fecha, estado, extra } = req.body;

        let [rows] = await pooldb.query(
          "INSERT INTO tbl_horas (legajo_empleado, id_tarea, cant_horas, fecha, estado, extra) VALUES (?, ?, ?, ?, ?, ?)",
          [legajo_empleado, id_tarea, cant_horas, fecha, estado ,extra]
        );
        res.json({ id: rows.insertId, legajo_empleado, id_tarea, cant_horas, fecha, estado, extra });
      } catch (error) {
        const loQueEnvian = req.body;
        res.status(500).send({loQueEnvian, error});
      }
};