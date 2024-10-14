const axios = require('axios');

const { saveItemInDynamo, countItemsInDynamo } = require('../utils/AWS')

module.exports = async (req, res, next) => {

  const tableName = process.env.DY_TABLE_ORDERS

  try {
    const order = { orderId: Date.now() };
    console.log(`New order received: ${JSON.stringify(order)}`);

    const countOrder = await countItemsInDynamo(tableName)

    // Enviar la orden a kitchen-service
    const response = await axios.post('http://kitchen-service:3002/api/order', { ...order, countOrder });
    console.log({response: response.data})


    const dataOrder = {
      ...order,
      'ID-ORDER': `ORDER N°${countOrder + 1}`,
      name: response.data.selectedRecipe.name,
      'ID-RECIPE': response.data.selectedRecipe['ID-RECIPE'],
      status: response.data.message,
      ingredients: response.data.ingredients,
    }
    console.log({dataOrder})
    await saveItemInDynamo(tableName, dataOrder)

    res.status(200).json({ message: 'Order successfully sent to kitchen' });
  } catch (error) {
    console.error('Error sending order to kitchen:', error);
    res.status(500).json({ message: 'Failed to send order to kitchen' });
  }
}
