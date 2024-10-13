// Libraries
const router = require('express').Router()

// Controllers
const InventoryController = require('../controllers/inventoryController')

// // Middlewares
// const { AuthMiddleware } = require('../middlewares')

router.post('/api/request-ingredients', [
    // AuthMiddleware,
    InventoryController,
])

module.exports = router
