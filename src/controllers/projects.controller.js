import { pooldb } from "../db.js";

export const getProjects = async (req, res) => {
    try {
        const [result] = await pooldb.query('SELECT * FROM tbl_proyecto');
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).send({ error });
    }
};

export const createProject = async (req, res) => {
    try {
        const { nombre, fecha_inicio, fecha_fin, fecha_fin_estimado, horas_reales, descripción, project_manager, id_cliente, estado, tipo } = req.body;

        if (fecha_fin_estimado < fecha_inicio)
            return res.status(400).json({
                message: "La fecha de fin esperado no puede ser menor a la fecha de inicio"
            });

        const [result] = await pooldb.query('INSERT INTO tbl_proyecto SET ?', {
            nombre,
            fecha_inicio,
            fecha_fin,
            fecha_fin_estimado,
            horas_reales,
            descripción,
            project_manager,
            id_cliente,
            estado,
            tipo
        });

        return res.status(200).json({ nombre, fecha_inicio, fecha_fin_estimado, fecha_fin, horas_reales, descripción, project_manager, id_cliente, estado, tipo, id: result.insertId });
    } catch (error) {
        const loQueEnvian = req.body;
        return res.status(500).send({ error, loQueEnvian });
    }
};

export const getProject = async (req, res) => {
    try {
        let [rows] = await pooldb.query("select * from tbl_proyecto where id = ?", [req.params.id]);

        if (rows.length <= 0)
            return res.status(404).json({
                message: "Project not found",
            });

        res.status(200).json(rows[0]);
    } catch (error) {
        return res.status(500).send(error);
    }
};

export const deleteProject = async (req, res) => {
    try {

        let [tareas_pendientes] = await pooldb.query("SELECT * FROM tbl_tarea WHERE id_proyecto = ? ", [req.params.id]);
        if (tareas_pendientes.length > 0)
            return res.status(400).json({
                message: "El proyecto aun tiene tareas sin terminar"
            });


        let [rows] = await pooldb.query("DELETE FROM tbl_proyecto WHERE id = ?", [req.params.id]);
        if (rows.affectedRows <= 0)
            return res.status(404).json({
                message: "Project not found",
            });

        res.status(204).json();
    } catch (error) {
        return res.status(500).send(error);
    }
};

export const updateProject = async (req, res) => {
    try {
        
        let [rows] = await pooldb.query("UPDATE tbl_proyecto SET ? WHERE id = ?", [req.body, id]);

        if (rows.affectedRows < 1)
            return res.status(404).json({
                message: "Project not found",
            });
        let [result] = await pooldb.query("select * from tbl_proyecto where id = ?", [id]);
        res.status(200).json(result[0]);
    } catch (error) {
        const loQueEnvian = req.body;
        res.status(500).send({ loQueEnvian, error });
    }
};
