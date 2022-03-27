const express = require('express');
const exchangeController = require('../controllers/beholderController');
const router = express.Router();

router.get('/memory', exchangeController.getMemory);
router.get('/brain', exchangeController.getBrain);

module.exports = router;
