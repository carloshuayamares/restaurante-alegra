const axios = require('axios');

const { selectElementTableDY } = require('../utils/AWS')

module.exports = async (req, res, next) => {
  const order = req.body;
  console.log(`Received order: ${JSON.stringify(order)}`);

  const tableName = process.env.DY_TABLE_RECIPES
  const totalRecipesNumber = process.env.TOTAL_RECIPES_NUMBER

  // Seleccionar una receta aleatoria
  const idRecipe = Math.floor(Math.random() * parseInt(totalRecipesNumber))
  const selectedRecipe = await selectElementTableDY(tableName, `${idRecipe + 1}A`)
  console.log(`Selected recipe: ${selectedRecipe.name}`);

  try {
    // Solicitar los ingredientes al inventory-service
    const response = await axios.post('http://inventory-service:3003/api/request-ingredients', {
      recipe: selectedRecipe,
      ...order,
    });

    if (response.data.success) {
      console.log(`Ingredients for ${selectedRecipe.name} are available, preparing the dish!`);
      return res.status(200).json({ selectedRecipe, waiting: false, message: 'El plato se está preparando.', ingredients: response.data.market ? 'Mercado': 'Inventario' });
    } else {
      console.log('Ingredients not available yet');
      return res.status(200).json({ selectedRecipe, waiting: true, message: 'Ingredientes no disponibles.', ingredients: response.data.market ? 'Mercado': 'Inventario' });
    }
  } catch (error) {
    console.error('Error requesting ingredients:', error.message);
    return res.status(500).json({ selectedRecipe, waiting: true, message: 'Error preparing the dish' });
  }
};
