const express = require('express');
const cors = require('cors'); // Importar CORS
const app = express();
const port = process.env.PORT;

app.use(cors()); // Habilitar CORS
app.use(express.json());

// Routes Definitions
const routes = require('./routes/orderRoute')

// Ruta para recibir la orden desde el frontend
app.use('/', routes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Order service running on port ${port}`);
});
