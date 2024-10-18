const express = require('express');
const cors = require('cors'); // Importar CORS
const app = express();
const port = process.env.PORT;

app.use(cors()); // Habilitar CORS
app.use(express.json());

// Routes Definitions
const routes = require('./routes/inventoryRoute')
const { receiveMessageSQS } = require('./utils/AWS')

// Ruta para manejar solicitudes de ingredientes
app.use('/', routes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Inventory service running on port ${port}`);
});

// job
setInterval(async () => {
    await receiveMessageSQS();
}, 15000);
