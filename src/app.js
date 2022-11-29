import express from "express";
import ticketsRoutes from "./routes/tickets.routes.js";

const app = express();

app.use(express.json());

app.use("/api", ticketsRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not found",
    });
});

export default app;