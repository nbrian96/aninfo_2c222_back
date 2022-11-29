CREATE VIEW `horas_tarea` AS
SELECT
	id_tarea,
	SUM(cant_horas)
FROM
	tbl_horas
GROUP BY id_tarea;