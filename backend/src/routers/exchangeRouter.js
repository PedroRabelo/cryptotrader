const express = require('express');
const exchangeController = require('../controllers/exchangeController');
const router = express.Router();

router.get('/balance', exchangeController.getBalance);

module.exports = router;
