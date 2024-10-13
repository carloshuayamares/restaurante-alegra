const express = require('express');
const cors = require('cors'); // Importar CORS
const axios = require('axios');
const app = express();
const port = process.env.PORT;

app.use(cors()); // Habilitar CORS
app.use(express.json());

// Ruta para recibir la orden desde el frontend
app.post('/api/order', async (req, res) => {
  try {
    const order = { orderId: Date.now() };
    console.log(`New order received: ${JSON.stringify(order)}`);

    // Enviar la orden a kitchen-service
    await axios.post('http://kitchen-service:3002/api/order', order);

    res.status(200).json({ message: 'Order successfully sent to kitchen' });
  } catch (error) {
    console.error('Error sending order to kitchen:', error.message);
    res.status(500).json({ message: 'Failed to send order to kitchen' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Order service running on port ${port}`);
});
