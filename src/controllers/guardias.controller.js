import { pooldb } from "../db.js";

export const createGuardia = async (req, res) => {
    try {
        let { legajo_empleado, fecha_inicio, fecha_fin } = req.body;

        let [rows] = await pooldb.query(
            "INSERT INTO tbl_guardia (legajo_empleado, fecha_inicio, fecha_fin) VALUES (?, ?, ?)",
            [legajo_empleado, fecha_inicio, fecha_fin]
        );
        res.status(201).json({ id: rows.insertId, legajo_empleado, fecha_inicio, fecha_fin });
    } catch (error) {
        const loQueEnvian = req.body;
        res.status(500).send({loQueEnvian});
    }
};

export const getGuardias = async (req, res) => {
    try {
        const [rows] = await pooldb.query("SELECT * FROM tbl_guardia");
        res.json(rows);
    } catch (error) {
        const loQueEnvian = req.body;
        res.status(500).send({loQueEnvian});
    }
};

export const getGuardia = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pooldb.query("SELECT * FROM tbl_guardia WHERE id = ?", [
            id,
        ]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Guardia not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        const loQueEnvian = req.body;
        res.status(500).send({loQueEnvian});
    }
};

export const getGuardiaEmpleado = async (req, res) => {
    try {
        const { legajo } = req.params;
        const [rows] = await pooldb.query("SELECT * FROM tbl_guardia WHERE legajo_empleado = ?", [
            legajo,
        ]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Guardia not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        const loQueEnvian = req.body;
        res.status(500).send({loQueEnvian});
    }
};

export const deleteGuardia = async (req, res) => {
    try {
        const { id } = req.params.id;
        const [rows] = await pooldb.query("DELETE FROM tbl_guardia WHERE id = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Guardia not found" });
        }

        res.sendStatus(204);
    } catch (error) {
        const loQueEnvian = req.body;
        res.status(500).send({loQueEnvian});
    }
};