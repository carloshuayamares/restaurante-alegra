const axios = require('axios');

const { getAllItemsInDynamo } = require('../utils/AWS')
const { capitalizeFirstLetter } = require('../utils/other')

// Inventario inicial
let inventory = {
    tomato: { qty: 5, id: 1 },
    lemon: { qty: 5, id: 2 },
    potato: { qty: 5, id: 3 },
    rice: { qty: 5, id: 4 },
    ketchup: { qty: 5, id: 5 },
    lettuce: { qty: 5, id: 6 },
    onion: { qty: 5, id: 7 },
    cheese: { qty: 5, id: 8 },
    meat: { qty: 5, id: 9 },
    chicken: { qty: 5, id: 10 },
};

module.exports = async (req, res, next) => {

    const tableName = process.env.DY_MARKET_REQUEST

    try {
        const response = await getAllItemsInDynamo(tableName)
        const ingredients = []

        for (let keyIngredient in inventory) {
            const arrayIngredient = response.filter((x) => x.ingredient === keyIngredient)

            if (arrayIngredient && arrayIngredient.length > 0) {
                arrayIngredient.sort((a, b) => b.fecCrea - a.fecCrea);
                const lastTimeElement = arrayIngredient[0];
                ingredients.push({
                    id: inventory[keyIngredient].id,
                    name: capitalizeFirstLetter(keyIngredient),
                    quantity: lastTimeElement.inventory,
                })
            } else {
                ingredients.push({
                    id: inventory[keyIngredient].id,
                    name: capitalizeFirstLetter(keyIngredient),
                    quantity: inventory[keyIngredient].qty,
                })
            }
        }

        return res.status(200).json({ success: true, ingredients });
    } catch (error) {
        console.error(`Error consiguiendo el inventario de la tabla ${tableName}`);
        return res.status(500).json({ message: `Error in conexion to dynamo ${tableName}.` });
    }

}
