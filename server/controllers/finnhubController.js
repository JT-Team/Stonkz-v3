const fs = require('fs')
const path = require('path')

const finnhubController = {};

finnhubController.getStockData = async (req, res, next) => {
  try{
  const { ticker, start, now } = req.query;
  const data = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=1&from=${start}&to=${now}&token=cf6a03aad3i9lmcgu910cf6a03aad3i9lmcgu91g`)
  const response = await data.json()
    // console.log(response)
    if (response.c && response.h) {
      res.locals.stockData = response;
      return next()
    } else {
      return next({message : { err : "Invalid Data for Stock Request"}, log : "ERROR in finnhubController.getStockData -- data not found"})
    }
}catch(err) {
    return next({
      log: `finnhubController.getStockData: ERROR: ${err}`,
      message: { err:  'Error ocurred in finnhubController.getStockData. Check server logs for more details.'},
    });
  }
}

finnhubController.getStockChange = async (req, res, next) => {
  try{
    const { ticker } = req.query;
    const data = await fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=cf6a03aad3i9lmcgu910cf6a03aad3i9lmcgu91g`)
    const response = await data.json()
    // console.log(req.query.ticker)
    // console.log(response)
    if (response.d === null && response.dp === null) {
        return next({message : { err : "Invalid Data for Stock Change"}, log : "ERROR in finnhubController.getStockChange -- data not found"})
    }
    res.locals.stockChange = response;
    // console.log("this is res.locals in stockChange:", res.locals)
    return next();
  } catch(err) {
      return next({
          log: `finnhubController.getStockChange: ERROR: ${err}`,
          message: { err:  'Error ocurred in finnhubController.getStockChange. Check server logs for more details.'},
        });
  }
}

finnhubController.getStockList = (req, res, next) => {
  try{
    const data = fs.readFileSync(path.resolve(__dirname, '../../stocks/stocks.json'))
    res.locals.stockList = JSON.parse(data)
    return next()
  } catch(err) {
    return next({
      log: `finnhubController.getStockList: ERROR: ${err}`,
      message: { err:  'Error ocurred in finnhubController.getStockList. Check server logs for more details.'},
    });
  }
}


module.exports = finnhubController;
