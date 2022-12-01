import { pooldb } from "../db.js";

export const getLicencias = async (req, res) => {
    try {
      const [rows] = await pooldb.query("SELECT * FROM tbl_licencia");
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const getLicencia = async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pooldb.query("SELECT * FROM tbl_licencia WHERE id = ?", [
        id,
      ]);
  
      if (rows.length <= 0) {
        return res.status(404).json({ message: "Hora not found" });
      }
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const deleteLicencia = async (req, res) => {
    try {
      const { id } = req.params.id;
      const [rows] = await pooldb.query("DELETE FROM tbl_licencia WHERE id = ?", [id]);
  
      if (rows.affectedRows <= 0) {
        return res.status(404).json({ message: "Hora not found" });
      }
  
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const getLicenciaEmpleado = async (req, res) => {
  try {
    const { legajo } = req.params;
    const [rows] = await pooldb.query("SELECT * FROM tbl_licencia WHERE legajo_empleado = ?", [
      legajo,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Hora not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

/*export const updateHoras = async (req, res) => {
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
};*/

export const createLicencia = async (req, res) => {
    try {
        const { legajo, tipo_licencia, descripcion, fecha_inicio, fecha_fin, goce_sueldo } = req.body;

        const [rows] = await pooldb.query(
          "INSERT INTO tbl_horas (legajo_empleado, tipo_licencia, descripcion, fecha_inicio, fecha_fin, goce_sueldo) VALUES (?, ?, ?, ?, ?, ?)",
          [legajo, tipo_licencia, descripcion, fecha_inicio, fecha_fin, goce_sueldo]
        );
        res.status(201).json({ id: rows.insertId, legajo, tipo_licencia, descripcion, fecha_inicio, fecha_fin, goce_sueldo });
      } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
      }
};