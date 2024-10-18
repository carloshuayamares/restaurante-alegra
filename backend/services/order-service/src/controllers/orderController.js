const axios = require('axios');

const { saveItemInDynamo, saveItemsInDynamo, countItemsInDynamo } = require('../utils/AWS')

module.exports = async (req, res, next) => {

  const tableName = process.env.DY_TABLE_ORDERS
  const { cantidad } = req.body
  console.log({cantidad})

  try {
    const countOrder = await countItemsInDynamo(tableName)
    // const arrayDataOrder = []

    for (let i = 0; i < parseInt(cantidad); i++) {

      const countOrderOne = countOrder + i
      const order = { orderId: Date.now() };
      console.log(`New order received: ${JSON.stringify(order)}`);
  
  
      // Enviar la orden a kitchen-service
      const response = await axios.post('http://kitchen-service:3002/api/order', { ...order, countOrder: countOrderOne });
      console.log({response: response.data})
  
      const dataOrder = {
        ...order,
        'ID-ORDER': `ORDER N°${countOrderOne + 1}`,
        name: response.data.selectedRecipe.name,
        'ID-RECIPE': response.data.selectedRecipe['ID-RECIPE'],
        ingredients: response.data.ingredients,
        status: response.data.status, // Listo, Pendiente, Errado
        description: response.data.message,
        waiting: response.data.waiting ? 'Entrega con demora.' : 'Entrega directa.'
      }
      // arrayDataOrder.push(dataOrder)
      await saveItemInDynamo(tableName, dataOrder)
    }
    // await saveItemsInDynamo(tableName, arrayDataOrder)

    res.status(200).json({ message: 'Order successfully sent to kitchen' });
  } catch (error) {
    console.error('Error sending order to kitchen:', error);
    res.status(500).json({ message: 'Failed to send order to kitchen' });
  }
}
