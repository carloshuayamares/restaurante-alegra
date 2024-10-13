const axios = require('axios');

const { selectElementTableDY } = require('../services/AWS')

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
