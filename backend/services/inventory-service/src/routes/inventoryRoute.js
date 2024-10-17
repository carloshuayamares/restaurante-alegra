// Libraries
const router = require('express').Router()

// Controllers
const InventoryController = require('../controllers/inventoryController')
const RetryConsultMarketController = require('../controllers/retryConsultMarketController')

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

module.exports = router
