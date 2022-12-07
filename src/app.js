import express from "express";
import cors from "cors"

import ticketsRoutes from "./routes/tickets.routes.js";
import employeesRoutes from "./routes/employees.routes.js";
import faltasRoutes from "./routes/faltas.routes.js";
import guardiasRoutes from "./routes/guardias.routes.js";
import licenciaRoutes from "./routes/licencia.routes.js";
import horasRoutes from "./routes/horas.routes.js";
import tareasRoutes from "./routes/tareas.routes.js";
import projectsRoutes from "./routes/projects.routes.js";
import clientesRoutes from "./routes/clientes.routes.js";
import versionRoutes from "./routes/versions.routes.js";
import productoRoutes from "./routes/producto.routes.js";
import prodVersionRoutes from "./routes/tbl_productos_y_versiones.routes.js";
import clienteProdRoutes from "./routes/tbl_cliente_producto.routes.js";
import clienteExtRoutes from "./routes/cliente_externo.routes.js";
import recursoExtRoutes from "./routes/recurso_externo.routes.js";

const app = express();

app.use(cors())
app.use(express.json());

app.use("/api", ticketsRoutes);
app.use("/api", employeesRoutes);
app.use("/api", guardiasRoutes);
app.use("/api", faltasRoutes);
app.use("/api", horasRoutes);
app.use("/api", tareasRoutes);
app.use("/api", licenciaRoutes);
app.use("/api", projectsRoutes);
app.use("/api", clientesRoutes);
app.use("/api", versionRoutes);
app.use("/api", productoRoutes);
app.use("/api", prodVersionRoutes);
app.use("/api", clienteProdRoutes);
app.use("/api", clienteExtRoutes);
app.use("/api", recursoExtRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not found",
    });
});

export default app;
