const axios = require('axios');

const recipes = [
  { name: 'Plato 1', ingredients: [{ name: 'tomato', qty: 2 }, { name: 'onion', qty: 1 }] },
  // 5 recetas más...
];

exports.processOrder = async (order) => {
  const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];

  try {
    const response = await axios.post('http://inventory-service:3003/api/request-ingredients', {
      recipe: randomRecipe,
    });

    if (response.data.success) {
      console.log(`Ingredients for ${randomRecipe.name} are ready, preparing the dish!`);
    }
  } catch (error) {
    console.error('Error fetching ingredients:', error.message);
  }
};
