const express = require('express');
const finnhubController = require('../controllers/finnhubController');
const router = express.Router();

router.get('/quote',
finnhubController.getStockChange,
  (req, res) => res.status(200).json(res.locals.stockChange)
)

router.get('/stocks',
finnhubController.getStockList,
  (req, res) => res.status(200).json(res.locals.stockList)
)

router.get('/',
finnhubController.getStockData,
  (req, res) => res.status(200).json(res.locals.stockData)
);

module.exports = router;