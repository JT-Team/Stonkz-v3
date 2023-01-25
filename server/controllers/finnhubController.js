const fs = require('fs')
const path = require('path')

const finnhubController = {};

finnhubController.getStockData = async (req, res, next) => {
  try{
  const { ticker, start, now } = req.query;
  const data = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=1&from=${start}&to=${now}&token=cf6a03aad3i9lmcgu910cf6a03aad3i9lmcgu91g`)
  const response = await data.json()
    // console.log(response)
    res.locals.stockData = response;
    return next()
}catch(err) {
    return next({
      log: `finnhubController.getStockData: ERROR: ${err}`,
      message: { err:  'Error ocurred in finnhubController.getStockData. Check server logs for more details.'},
    });
  }
}

finnhubController.getStockChange = (req, res, next) => {
  const { ticker } = req.query;
  fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=cf6a03aad3i9lmcgu910cf6a03aad3i9lmcgu91g`)
  .then(data => data.json())
  .then(data => {
    res.locals.stockChange = data;
    return next();
  })
  .catch(err => {
    return next({
      log: `finnhubController.getStockChange: ERROR: ${err}`,
      message: { err:  'Error ocurred in finnhubController.getStockChange. Check server logs for more details.'},
    });
  })
}

finnhubController.getStockList = (req, res, next) => {
  fs.readFile(path.resolve(__dirname, '../../stocks/stocks.json'), 'utf8', (err, data) => {
    if (err) {
      return next({
        log: `finnhubController.getStockList: ERROR: ${err}`,
        message: { err:  'Error ocurred in finnhubController.getStockList. Check server logs for more details.'},
      });
    }
    res.locals.stockList = JSON.parse(data)
    return next()
  })
}


module.exports = finnhubController;
