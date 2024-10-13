// Libraries
const router = require('express').Router()

// Controllers
const KitchenControllers = require('../controllers/kitchenController')

// // Middlewares
// const { AuthMiddleware } = require('../middlewares')

router.post('/api/order', [
    // AuthMiddleware,
    KitchenControllers,
])

module.exports = router
