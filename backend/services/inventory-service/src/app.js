const express = require('express');
const app = express();
const port = process.env.PORT;

app.use(express.json());

// Routes Definitions
const routes = require('./routes/inventoryRoute')

// Ruta para manejar solicitudes de ingredientes
app.use('/', routes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Inventory service running on port ${port}`);
});
