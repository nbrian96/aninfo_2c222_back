CREATE VIEW `horas_proyecto` AS
SELECT
	id_tarea,
	tbl_tarea.id_proyecto,
	SUM(cant_horas)
FROM
	tbl_horas
JOIN tbl_tarea ON tbl_tarea.id = tbl_horas.id_tarea
GROUP BY id_proyecto;