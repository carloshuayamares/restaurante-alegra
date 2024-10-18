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
    let { intento } = req.body;

    let market = false
    console.log(`Request for ingredients received: ${JSON.stringify(recipe)}`);

    const missingIngredients = recipe.ingredients.filter(
        (ingredient) => inventory[ingredient.name] < ingredient.qty
    );

    console.log({inventory, missingIngredients})

    for (const ingredient of missingIngredients) {
        let quantityNeeded = ingredient.qty - inventory[ingredient.name];
        let temp = 1

        while (quantityNeeded > 0) {
            // Hacer la solicitud a la plaza de mercado
            try {
                const response = await axios.get(`https://recruitment.alegra.com/api/farmers-market/buy?ingredient=${ingredient.name}`);
                const quantitySold = response.data.quantitySold;
                market = true

                const itemMarketRequest = {
                    'ID-MARKET': intento ? `OR${countOrder + 1}-${ingredient.name.toUpperCase()}-TEMP${temp}-RE${intento}` : `OR${countOrder + 1}-${ingredient.name.toUpperCase()}-TEMP${temp}`,
                    orderId: `${orderId}`,
                    ingredient: ingredient.name,
                    quantitySold,
                    intento: intento ? `${intento}` : '',
                    inventory: inventory[ingredient.name] += quantitySold,
                    fecCrea: Date.now(),
                }

                await saveItemInDynamo(tableName, itemMarketRequest)

                temp += 1

                if (quantitySold > 0) {
                    // inventory[ingredient.name] += quantitySold;
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
        recipe.ingredients.forEach(async(ingredient) => {
            inventory[ingredient.name] -= ingredient.qty;

            const itemInventoryRequest = {
                'ID-MARKET': intento ? `OR${countOrder + 1}-${ingredient.name.toUpperCase()}-RE${intento}` : `OR${countOrder + 1}-${ingredient.name.toUpperCase()}`,
                orderId: `${orderId}`,
                ingredient: ingredient.name,
                quantityUsed: ingredient.qty,
                intento: intento ? `${intento}` : '',
                inventory: inventory[ingredient.name],
                fecCrea: Date.now(),
            }
            await saveItemInDynamo(tableName, itemInventoryRequest)
        });
        console.log(`Ingredients for ${recipe.name} are ready. Proceeding with preparation.`);
        return res.status(200).json({ success: true, market });
    } else {
        if (intento) intento += 1
        else intento = 1
        console.log('Not all ingredients available. Wait please.', {intento});
        // mandar a un sqs
        await sendMessageSQS(req.body, intento, `${countOrder}`)
        // guardar en una tabla el estado en espera
        return res.status(200).json({ success: false, market, message: 'Not all ingredients available. Wait please.' });
    }

}
