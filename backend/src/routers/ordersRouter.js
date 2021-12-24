const express = require('express');
const ordersController = require('../controllers/ordersController');
const router = express.Router();

router.get('/:symbol?', ordersController.getOrders);

router.post('/', ordersController.placeOrder);

router.delete('/:symbol/:orderId', ordersController.cancelOrder);

module.exports = router;
