// Libraries
const router = require('express').Router()

// Controllers
const InventoryController = require('../controllers/inventoryController')
const RetryConsultMarketController = require('../controllers/retryConsultMarketController')

const IngredientsCountController = require('../controllers/ingredientsCountController')
const IngredientsHistoryController = require('../controllers/ingredientsHistoryController')

// // Middlewares
// const { AuthMiddleware } = require('../middlewares')

router.post('/api/request-ingredients', [
    // AuthMiddleware,
    InventoryController,
])

router.post('/api/retry-market', [
    // AuthMiddleware,
    RetryConsultMarketController,
])

router.post('/api/ingredients-count', [
    // AuthMiddleware,
    IngredientsCountController,
])

router.post('/api/ingredients-history', [
    // AuthMiddleware,
    IngredientsHistoryController,
])


module.exports = router
