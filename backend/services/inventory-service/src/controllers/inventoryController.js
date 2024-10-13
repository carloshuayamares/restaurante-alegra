const axios = require('axios');

// Inventario inicial
let inventory = {
  tomato: 5,
  lemon: 5,
  potato: 5,
  rice: 5,
  ketchup: 5,
  lettuce: 5,
  onion: 5,
  cheese: 5,
  meat: 5,
  chicken: 5,
};

module.exports = async (req, res, next) => {
  const { recipe } = req.body;
  console.log(`Request for ingredients received: ${JSON.stringify(recipe)}`);

  const missingIngredients = recipe.ingredients.filter(
      (ingredient) => inventory[ingredient.name] < ingredient.qty
  );

  for (const ingredient of missingIngredients) {
      let quantityNeeded = ingredient.qty - inventory[ingredient.name];

      while (quantityNeeded > 0) {
          // Hacer la solicitud a la plaza de mercado
          try {
              const response = await axios.get(`https://recruitment.alegra.com/api/farmers-market/buy?ingredient=${ingredient.name}`);
              const quantitySold = response.data.quantitySold;

              if (quantitySold > 0) {
                  inventory[ingredient.name] += quantitySold;
                  quantityNeeded -= quantitySold;
                  console.log(`Purchased ${quantitySold} of ${ingredient.name} from the market`);
              } else {
                  console.log(`${ingredient.name} not available at the market`);
                  break;  // No más unidades disponibles en el mercado
              }
          } catch (error) {
              console.error(`Error fetching ${ingredient.name} from market: ${error.message}`);
              return res.status(500).json({ message: `Error fetching ${ingredient.name} from market` });
          }
      }
  }

  // Verificar si todos los ingredientes están disponibles ahora
  const allAvailable = recipe.ingredients.every(
      (ingredient) => inventory[ingredient.name] >= ingredient.qty
  );

  if (allAvailable) {
      // Restar los ingredientes usados
      recipe.ingredients.forEach((ingredient) => {
          inventory[ingredient.name] -= ingredient.qty;
      });
      console.log(`Ingredients for ${recipe.name} are ready. Proceeding with preparation.`);
      return res.status(200).json({ success: true });
  } else {
      console.log('Ingredients still missing');
      // mandar a un sqs
      // guardar en una tabla el estado en espera
      return res.status(400).json({ success: false, message: 'Not all ingredients available' });
  }

}
