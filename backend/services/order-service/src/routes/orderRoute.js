// Libraries
const router = require('express').Router()

// Controllers
const OrderController = require('../controllers/orderController')
const RecipesController = require('../controllers/recipesController')
const StatusOrdersController = require('../controllers/statusOrdersController')

// // Middlewares
// const { AuthMiddleware } = require('../middlewares')

router.post('/api/order', [
    // AuthMiddleware,
    OrderController,
])

router.post('/api/recipes', [
    // AuthMiddleware,
    RecipesController,
])

router.post('/api/statusOrders', [
    // AuthMiddleware,
    StatusOrdersController,
])

module.exports = router
