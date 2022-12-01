import { pooldb } from "../db.js";

export const createEmployee = async (req, res) => {
    try {
        const { id_gerente, nombre, apellido, cargo, antiguedad } = req.body;

        const [rows] = await pool.query(
            "INSERT INTO tbl_empleado (id_gerente, nombre, apellido, cargo, antiguedad) VALUES (?, ?, ?, ?, ?)",
            [id_gerente, nombre, apellido, cargo, antiguedad]
        );
        res.status(201).json({ legajo: rows.insertId, id_gerente, nombre, apellido, cargo, antiguedad });
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const getEmployee = async (req, res) => {
    try {
        const { legajo } = req.params.legajo;
        const [rows] = await pool.query("SELECT * FROM tbl_empleado WHERE legajo = ?", [
            legajo,
        ]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        // return res.status(500).send({ message: "Something goes wrong", });
        return res.status(500).send({ error });
    }
};

export const getEmployees = async (req, res) => {
    try {
        let [rows] = await pooldb.query("select * from tbl_empleado");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};

export const updateEmployee = async (req, res) => {
    let { legajo } = req.params.legajo;
    let { id_gerente, nombre, apellido, cargo, antiguedad } = req.body;

    let [rows] = await pooldb.query(
        "update tbl_empleado set id_gerente = ?, nombre = ?, apellido = ?, cargo = ?, antiguedad = ?  where legajo = ?",
        [id_gerente, nombre, apellido, cargo, antiguedad, legajo]
    );

    if (rows.affectedRows < 1)
        return res.status(404).json({
            message: "Employee not found",
        });

    let [result] = await pooldb.query("select * from tbl_empleado where legajo = ?", [legajo]);

    res.json(result[0]);
};


export const deleteEmployee = async (req, res) => {
    try {
        const { legajo } = req.params.legajo;
        const [rows] = await pool.query("DELETE FROM tbl_empleado WHERE legajo = ?", [legajo]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};