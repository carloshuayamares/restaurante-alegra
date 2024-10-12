const express = require('express');
const axios = require('axios');
const app = express();
const port = 3002;

app.use(express.json());

// Lista de recetas disponibles
const recipes = [
  { name: 'Plato 1', ingredients: [{ name: 'tomato', qty: 2 }, { name: 'onion', qty: 1 }] },
  { name: 'Plato 2', ingredients: [{ name: 'garlic', qty: 1 }, { name: 'potato', qty: 3 }] },
  { name: 'Plato 3', ingredients: [{ name: 'carrot', qty: 1 }, { name: 'tomato', qty: 2 }] },
  // Agregar más recetas aquí...
];

// Ruta para recibir una orden
app.post('/api/order', async (req, res) => {
  const order = req.body;
  console.log(`Received order: ${JSON.stringify(order)}`);

  // Seleccionar una receta aleatoria
  const selectedRecipe = recipes[Math.floor(Math.random() * recipes.length)];
  console.log(`Selected recipe: ${selectedRecipe.name}`);

  try {
    // Solicitar los ingredientes al inventory-service
    const response = await axios.post('http://inventory-service:3003/api/request-ingredients', {
      recipe: selectedRecipe,
    });

    if (response.data.success) {
      console.log(`Ingredients for ${selectedRecipe.name} are available, preparing the dish!`);
      res.status(200).json({ message: 'Dish is being prepared' });
    } else {
      console.log('Ingredients not available yet');
      res.status(400).json({ message: 'Ingredients not available' });
    }
  } catch (error) {
    console.error('Error requesting ingredients:', error.message);
    res.status(500).json({ message: 'Error preparing the dish' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Kitchen service running on port ${port}`);
});
