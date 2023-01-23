const finnhubController = {};

finnhubController.getStockData = (req, res, next) => {
  const { ticker } = req.query;
  fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=1&from=1674219600&to=1674237600&token=cf6a03aad3i9lmcgu910cf6a03aad3i9lmcgu91g`)
  .then(data => data.json())
  .then(data => {
    res.locals.stockData = data;
    return next();
  })
  .catch(err => {
    next({
      log: `finnhubController.getStockData: ERROR: ${err}`,
      message: { err:  'Error ocurred in finnhubController.getStockData. Check server logs for more details.'},
    });
  })
}


module.exports = finnhubController;
