import { pooldb } from "../db.js";

const getProjects = async (req, res) => {
    try {
        const [result] = await pooldb.query('SELECT * FROM tbl_proyecto')
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
}

const createProject = async (req, res) => {
    try{
        const { nombre, estado, fecha_inicio, fecha_fin } = req.body
        const [result] = await pooldb.query('INSERT INTO tbl_proyecto SET ?', {
            nombre: nombre,
            estado: estado,
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
        });
    return res.status(200).json({ nombre, estado, id: result.insertId });
    } catch (error){
        return res.status(500).json({ message: "Something goes wrong" });
    }
}

export const getByProjectId = async (req, res) => {
    try {
        let [rows] = await pooldb.query("Select * from tbl_proyecto where id = ?", [req.params.id,]);
        if (rows.lenght <= 0)
            return res.status(404).json({
                message: "Project not found",
            });
        res.status(200).json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};