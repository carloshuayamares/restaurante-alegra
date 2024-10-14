// Libraries
const router = require('express').Router()

// Controllers
const OrderController = require('../controllers/orderController')

// // Middlewares
// const { AuthMiddleware } = require('../middlewares')

router.post('/api/order', [
    // AuthMiddleware,
    OrderController,
])

module.exports = router
