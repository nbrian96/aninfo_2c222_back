const url_api_clientes = "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes";

export const getClientsExt = async (req, res) => {
    try {
        fetch(url_api_clientes).then((respuesta) => {return res.json(respuesta);})
    } catch (error) {
        res.status(500).send({ error });
    }
};


