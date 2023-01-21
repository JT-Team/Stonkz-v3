const finnhubController = {};

finnhubController.getStockData = (req, res, next) => {
  const { ticker } = req.query;
  console.log(ticker);
  fetch(`https://api.twelvedata.com/time_series?apikey=b0aee648ba8d47a89de46a4dbaa9d83d&interval=1min&symbol=${ticker}&type=stock&end_date=2023-01-21 17:00:00&format=JSON&start_date=2023-01-18 09:00:00`)
  .then(res => res.json())
  .then(res => {
    console.log(res)
    res.locals.stockData;
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
