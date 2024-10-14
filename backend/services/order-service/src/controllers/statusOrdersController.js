const { getAllItemsInDynamo } = require('../utils/AWS')

module.exports = async (req, res, next) => {

  const tableName = process.env.DY_TABLE_ORDERS

  try {
    const allOrders = await getAllItemsInDynamo(tableName)
    res.status(200).json({ orders: allOrders });
  } catch (error) {
    console.error('Error. Failed to consult order registration:', error);
    res.status(500).json({ recipes: [], message: 'Failed to consult order registration.' });
  }
}
