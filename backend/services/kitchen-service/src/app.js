const express = require('express');
const app = express();
const port = 3002;

app.use(express.json());

// Routes Definitions
const routes = require('./routes/kitchenRoute')

// Ruta para recibir una orden
app.use('/', routes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Kitchen service running on port ${port}`);
});
