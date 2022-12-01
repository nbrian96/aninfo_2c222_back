import { pooldb } from "../db.js";

export const createGuardia = async (req, res) => {
    try {
        const { legajo_empleado, fecha_inicio, fecha_fin } = req.body;

        const [rows] = await pooldb.query(
            "INSERT INTO tbl_guardia (legajo_empleado, fecha_inicio, fecha_fin) VALUES (?, ?, ?)",
            [legajo_empleado, fecha_inicio, fecha_fin]
        );
        res.status(201).json({ id: rows.insertId, legajo_empleado, fecha_inicio, fecha_fin });
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const getGuardias = async (req, res) => {
    try {
        const [rows] = await pooldb.query("SELECT * FROM tbl_guardia");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
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
        return res.status(500).json({ message: "Something goes wrong" });
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
        return res.status(500).json({ message: "Something goes wrong" });
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
        return res.status(500).json({ message: "Something goes wrong" });
    }
};