import fetch from "node-fetch";
import cors from "cors"
import express from "express";

const app = express();
app.use(cors())

const url_api_recursos = "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/recursos-psa/1.0.0/m/api/recursos";

export const getRecursosExt = async (req, res) => {
	fetch(url_api_recursos)
		.then(promesa => promesa.json())
		.then(enviar => { res.json(enviar); });
};


