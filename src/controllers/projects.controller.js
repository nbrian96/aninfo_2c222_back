import { pooldb } from "../db.js";

export const getProjects = async (req, res) => {
    try {
        const [result] = await pooldb.query('SELECT * FROM tbl_proyecto');
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const createProject = async (req, res) => {
    try {
        const { nombre, fecha_inicio, fecha_fin, estado, prioridad, costo_acumulado, horas_estimadas, horas_reales } = req.body;
        const [result] = await pooldb.query('INSERT INTO tbl_proyecto SET ?', {
            nombre: nombre,
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            estado: estado,
            prioridad: prioridad,
            costo_acumulado: costo_acumulado,
            horas_estimadas: horas_estimadas,
            horas_reales: horas_reales
        });

        return res.status(200).json({ nombre, fecha_inicio, fecha_fin, estado, prioridad, costo_acumulado, horas_estimadas, horas_reales, id: result.insertId });
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const getByProjectId = async (req, res) => {
    try {
        let [rows] = await pooldb.query("Select * from tbl_proyecto where id = ?", [req.params.id]);
        if (rows.lenght === 0)
            return res.status(404).json({
                message: "Project not found",
            });
        //res.status(200).json(rows[0]);
        res.status(200).send(rows);
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};

export const deleteProject = async (req, res) => {
    try {
        let [rows] = await pooldb.query("DELETE FROM tbl_proyecto WHERE id = ?", [req.params.id]);
        if (rows.affectedRows <= 0)
            return res.status(404).json({
                message: "Project not found",
            });

        res.status(204).json();
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};

export const updateProject = async (req, res) => {
    try {
        let { id } = req.params;
        let [rows] = await pooldb.query("UPDATE tbl_proyecto SET ? WHERE id = ?", [req.body, id]);
        if (rows.affectedRows < 1)
            return res.status(404).json({
                message: "Project not found",
            });
        let [result] = await pooldb.query("select * from tbl_proyecto where id = ?", [id]);
        res.json(result[0]);
    } catch (error) {
        const loQueEnvian = req.body;
        res.status(500).send({ loQueEnvian, error });
    }

};
