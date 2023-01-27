const { Experimental_CssVarsProvider } = require('@mui/material');
const fs = require('fs');
const path = require('path');
const { isTypedArray } = require('util/types');
const finnhubController = require('../server/controllers/finnhubController.js');
const { getMockReq, getMockRes } = require('@jest-mock/express');
const { runInNewContext } = require('vm');
// const req = getMockReq
// const { res, next, mockClear } = getMockRes()




describe('finnhubController unit tests', () => {
  const req = getMockReq()
  beforeEach(() => {
    req.query = {
      start : 1674709200,
      now : 1674749036,
      ticker : 'AAPL'
    }
  })

  describe('getStockData', () => {
    it('adds valid stockData object to res', async () => {
      //make a mock res
      const { res, next, mockClear } = getMockRes()

      //send mock request
      await finnhubController.getStockData(req, res, next)

      //expect stockData to exist on res
      expect(res.locals).toHaveProperty("stockData")
      //expect response to have "c" whcih is a property on the candle fetch
      expect(res.locals.stockData).toHaveProperty("c")
      //expect c to be an array because its an array of numbers
      expect(Array.isArray(res.locals.stockData.c)).toEqual(true)
      //expect c's first element to be a number
      expect(typeof res.locals.stockData.c[0]).toEqual('number')
    }, 30001);
    it('throws an error if fetch request returns no data', async () => {
      //make a mock res
      const { res, next, mockClear } = getMockRes()

      //reset the ticker to a bad one
      req.query.ticker = 'fakeTicker'

      //send mock request
      await finnhubController.getStockData(req, res, next)

      //expect next to have been called with an object, triggering an error
      expect(next).toHaveBeenCalledWith(expect.any(Object))
      //expect no stockData obj to be added
      expect(res.locals).not.toHaveProperty('stockData')
    }, 30000)
  });

  describe('getStockChange', () => {
    it('adds valid stockChange object to res', async () => {
      const { res, next, mockClear } = getMockRes()

      console.log(req.query)
      await finnhubController.getStockChange(req, res, next)

      // expect(next).toHaveBeenCalledWith(expect.any(Object))
      expect(res.locals).toHaveProperty('stockChange')
    }, 30000)
    it('throws an error if fetch request returns no data', async () => {

      //make a mock res
      const { res, next, mockClear } = getMockRes()

      //reset the ticker to a bad one
      req.query.ticker = 'fakeTicker'

      //send mock request
      await finnhubController.getStockChange(req, res, next)

      //expect next to have been called with an object, triggering an error
      expect(next).toHaveBeenCalledWith(expect.any(Object))
      //expect no stockData obj to be added
      expect(res.locals).not.toHaveProperty('stockChange')

    }, 30000)
  })

  describe('getStocList', () => {
    it('should return the list of stocks at stocks/stocklist.json', async () => {
      const { res, next, mockClear } = getMockRes()

      const originalStockList = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../stocks/stocks.json')))
      await finnhubController.getStockList(req, res, next)

      expect(res.locals.stockList).toBeInstanceOf(Object)
      // expect(JSON.stringify(res.locals.stockList)).toEqual(JSON.stringify(originalStockList))
      // expect(JSON.stringify(res.locals.stockList)).toEqual(JSON.stringify(originalStockList))
    }
    )
  })

})



//should return range of stock data

//should return snapshot stock data