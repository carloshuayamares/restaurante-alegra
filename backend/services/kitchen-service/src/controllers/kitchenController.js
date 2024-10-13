const axios = require('axios');

// Lista de recetas disponibles
const recipes = [
  {
    "name": "Ensalada de Pollo y Vegetales",
    "ingredients": [
      { "name": "lettuce", "qty": 1 },
      { "name": "tomato", "qty": 2 },
      { "name": "chicken", "qty": 1 },
      { "name": "onion", "qty": 1 },
      { "name": "lemon", "qty": 1 }
    ]
  },
  {
    "name": "Hamburguesa de Carne con Queso y Vegetales",
    "ingredients": [
      { "name": "meat", "qty": 1 },
      { "name": "lettuce", "qty": 1 },
      { "name": "tomato", "qty": 1 },
      { "name": "cheese", "qty": 1 },
      { "name": "ketchup", "qty": 2 }
    ]
  },
  {
    "name": "Arroz con Pollo y Papas",
    "ingredients": [
      { "name": "chicken", "qty": 1 },
      { "name": "potato", "qty": 3 },
      { "name": "rice", "qty": 1 },
      { "name": "onion", "qty": 1 }
    ]
  },
  {
    "name": "Papas Fritas con Ketchup",
    "ingredients": [
      { "name": "potato", "qty": 4 },
      { "name": "ketchup", "qty": 3 }
    ]
  },
  {
    "name": "Pollo al Limón con Arroz",
    "ingredients": [
      { "name": "chicken", "qty": 1 },
      { "name": "lemon", "qty": 2 },
      { "name": "rice", "qty": 1 }
    ]
  },
  {
    "name": "Ensalada de Tomate y Queso",
    "ingredients": [
      { "name": "tomato", "qty": 3 },
      { "name": "cheese", "qty": 1 },
      { "name": "lettuce", "qty": 1 },
      { "name": "onion", "qty": 1 }
    ]
  }
];

module.exports = async (req, res, next) => {
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
};
