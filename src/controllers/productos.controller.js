import { pooldb } from "../db.js";

export const getProductos = async (req, res) => {
    try {
        let [rows] = await pooldb.query("select * from tbl_producto");
        res.json(rows);
    } catch (error) {
        res.status(500).send({ error });
    }
};

export const getProducto = async (req, res) => {
    try {
        let [rows] = await pooldb.query("select * from tbl_producto where id = ?", [
            req.params.id,
        ]);

        if (rows.length <= 0)
            return res.status(404).json({
                message: "Producto not found",
            });

        res.json(rows[0]);
    } catch (error) {
        res.status(500).send({ error });
    }
};

export const deteleProducto = async (req, res) => {
    try {
        let [rows] = await pooldb.query("delete from tbl_producto where id = ?", [
            req.params.id,
        ]);

        if (rows.affectedRows < 1)
            return res.status(404).json({
                message: "Producto not found",
            });

        res.sendStatus(204);
    } catch (error) {
        res.status(500).send({ error });
    }
};

export const createProducto = async (req, res) => {
    try {

        let {
            id_version,
            nombre,
            fecha_lanzamiento
        } = req.body;

        let [rows] = await pooldb.query(
            "insert into tbl_producto (id_version,nombre,fecha_lanzamiento) values (?, ?, ?)",
            [
                id_version,
                nombre,
                fecha_lanzamiento
            ]
        );

        res.send({
            id: rows.insertId,
            id_version,
            nombre,
            fecha_lanzamiento
        });
    } catch (error) {
        const loQueEnvian = req.body;
        res.status(500).send({ loQueEnvian, error });
    }
};

export const updateProducto = async (req, res) => {
    try {
        let { id } = req.params;
        let {
            id_version,
            nombre,
            fecha_lanzamiento
        } = req.body;

        let [rows] = await pooldb.query(
            "update tbl_producto set id_version = ?,nombre = ?,fecha_lanzamiento = ? where id = ?",
            [
                id_version,
                nombre,
                fecha_lanzamiento,
                id
            ]
        );

        if (rows.affectedRows < 1)
            return res.status(404).json({
                message: "Producto not found",
            });

        let [result] = await pooldb.query("select * from tbl_producto where id = ?", [id]);

        res.json(result[0]);

    } catch (error) {
        const loQueEnvian = req.body;
        res.status(500).send({ loQueEnvian, error });
    }
};