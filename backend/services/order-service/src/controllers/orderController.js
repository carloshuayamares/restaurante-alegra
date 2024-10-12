const axios = require('axios');

exports.placeOrder = async (req, res) => {
  try {
    // Envía la orden al servicio de cocina
    await axios.post('http://kitchen-service:3002/api/order', { orderId: Date.now() });
    res.status(200).json({ message: 'Order placed successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order.' });
  }
};
