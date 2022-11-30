import express from "express";

import ticketsRoutes from "./routes/tickets.routes.js";
import employeesRoutes from "./routes/employees.routes.js";
import faltasRoutes from "./routes/faltas.routes.js";
import horasRoutes from "./routes/horas.routes.js";
import proyectsRoutes from "./routes/proyects.routes.js";

const app = express();

app.use(express.json());

app.use("/api", ticketsRoutes);
app.use("/api", employeesRoutes);
app.use("/api", faltasRoutes);
app.use("/api", horasRoutes);
app.use("/api", proyects);

app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not found",
    });
});

export default app;