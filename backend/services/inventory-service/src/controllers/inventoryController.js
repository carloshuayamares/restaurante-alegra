const axios = require('axios');

const { saveItemInDynamo, sendMessageSQS } = require('../utils/AWS')

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

    const tableName = process.env.DY_MARKET_REQUEST

    const { recipe, orderId, countOrder } = req.body;
    let market = false
    let temporal = 1
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
                market = true

                const itemMarketRequest = {
                    'ID-MARKET': `OR${countOrder + 1}-MK${temporal}`,
                    orderId: `${orderId}`,
                    ingredient: ingredient.name,
                    quantitySold,
                }

                await saveItemInDynamo(tableName, itemMarketRequest)

                if (quantitySold > 0) {
                    inventory[ingredient.name] += quantitySold;
                    quantityNeeded -= quantitySold;
                    console.log(`Purchased ${quantitySold} of ${ingredient.name} from the market`);
                    temporal += 1
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
        return res.status(200).json({ success: true, market });
    } else {
        console.log('Ingredients still missing');
        // mandar a un sqs
        await sendMessageSQS(req.body, `${countOrder}`)
        // guardar en una tabla el estado en espera
        return res.status(200).json({ success: false, market, message: 'Not all ingredients available. Wait please.' });
    }

}
