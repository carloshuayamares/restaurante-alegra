const { getAllItemsInDynamo } = require('../utils/AWS')

module.exports = async (req, res, next) => {

  const tableName = process.env.DY_TABLE_RECIPES

  try {
    const allRecipes = await getAllItemsInDynamo(tableName)
    res.status(200).json({ recipes: allRecipes });
  } catch (error) {
    console.error('Error. Failed to consult recipes:', error);
    res.status(500).json({ recipes: [], message: 'Failed to consult recipes' });
  }
}
