import fetch from "node-fetch";
import cors from "cors"
import express from "express";

const app = express();
app.use(cors())

export const getClientsExt = async (req, res) => {
        const url_api_clientes = "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes";
        fetch(url_api_clientes)
        .then(promesa => promesa.json())
        .then(enviar => { res.json(enviar);});
};


