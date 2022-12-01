import express from "express";

import ticketsRoutes from "./routes/tickets.routes.js";
import employeesRoutes from "./routes/employees.routes.js";
import faltasRoutes from "./routes/faltas.routes.js";
import guardiasRoutes from "./routes/guardias.routes.js";
import licenciaRoutes from "./routes/licencia.routes.js";
import horasRoutes from "./routes/horas.routes.js";
import tareasRoutes from "./routes/tareas.routes.js";
//import proyectsRoutes from "./routes/proyects.routes.js";

const app = express();

app.use(express.json());

app.use("/api", ticketsRoutes);
app.use("/api", employeesRoutes);
app.use("/api", guardiasRoutes);
app.use("/api", faltasRoutes);
app.use("/api", horasRoutes);
app.use("/api", tareasRoutes);
app.use("/api", licenciaRoutes);
//app.use("/api", proyectsRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not found",
    });
});

export default app;