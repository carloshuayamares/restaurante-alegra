const axios = require('axios');

let inventory = {
  tomato: 5,
  onion: 5,
  garlic: 5,
  // más ingredientes...
};

exports.requestIngredients = async (req, res) => {
  const { recipe } = req.body;

  const missingIngredients = recipe.ingredients.filter(i => inventory[i.name] < i.qty);

  for (const ingredient of missingIngredients) {
    let quantityNeeded = ingredient.qty - inventory[ingredient.name];
    while (quantityNeeded > 0) {
      const marketResponse = await axios.get(`${process.env.FARMERS_MARKET_URL}?ingredient=${ingredient.name}`);
      if (marketResponse.data.quantitySold > 0) {
        inventory[ingredient.name] += marketResponse.data.quantitySold;
        quantityNeeded -= marketResponse.data.quantitySold;
      } else {
        console.log(`${ingredient.name} is not available at the market.`);
        break;
      }
    }
  }

  const allIngredientsAvailable = recipe.ingredients.every(i => inventory[i.name] >= i.qty);
  if (allIngredientsAvailable) {
    recipe.ingredients.forEach(i => inventory[i.name] -= i.qty);
    res.status(200).json({ success: true });
  } else {
    res.status(200).json({ success: false });
  }
};
