import React, { Component, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ChartComponent from './subComponents/ChartComponent.jsx'
import Navbar from './subComponents/Navbar.jsx'
import StockDisplay from './subComponents/StockDisplay.jsx'
import Ticker from 'react-ticker'
import PageVisibility from 'react-page-visibility'

const Home = () => {
  const [currStock, setStock] = useState('AAPL')
  const [stockStore, setStockStore] = useState({})
  const [currStockInfo, setStockInfo] = useState([])
  const [stockChange, setStockChange] = useState({})
  const [priceChange, setPriceChange] = useState(0)
  const [percentChange, setPercentChange] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [pageIsVisible, setPageIsVisible] = useState(true)
  
  useEffect(() => {
    //time for graph points
    const now = new Date();
    let timestampNow = Math.floor(now / 1000);
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let timestampStart = startOfDay / 1000;
    
    if (startOfDay.getDay() === 6) {
      timestampStart -= 86400
      timestampNow = timestampStart + 86399
    }
    else if (startOfDay.getDay() === 0) {
      timestampStart = timestampStart - (2 * 86400)
      timestampNow = timestampStart + 86399
    }

    //fetch and parse data from finnhub API
    fetchStockData(timestampStart, timestampNow).then(stock => {
      let parseData = [];
      for (let i = 0; i < stock.t.length; i++) {
        parseData.push({time: stock.t[i], open: stock.o[i], high: stock.h[i], low: stock.l[i], close: stock.c[i]})
      }
      return parseData;
    })
    .then((parseData) => {
      setStockInfo([...parseData])
      setIsLoading(false)
    })
    .catch((err) => {
      console.log("unable to fetch data from api")
    })

    //fetch current stock change info
    fetchStockChange().then(data => {
      setStockChange(data)
      setPriceChange(Math.round((data.c - data.o) * 100 ) / 100)
      setPercentChange(Math.round(data.dp * 100) / 100)
    })
    .catch((error) => {
      console.log(`fetchStockChange: unable to grab data from server- ${error}`)
    })

    //fetch list of stocks
    fetchStock().then(listStock => {
      setStockStore(listStock)
    })
    .catch((error) => {
      console.log(`fetchStock: unable to grab data from server- ${error}`)
    })
  }, [currStock])

  //fetches the list of stocks
  const fetchStock = async () => {
    try {
      let response = await fetch('/api/stocks')
      let data = await response.json()
      return data
    }
    catch (error) {
      console.log('Error fetching stocks from filesystem')
    }
  }

  //fetches the focus stock data
  const fetchStockData = async (timeStart, timeNow) => {
    try {
      let response = await fetch(`/api?ticker=${currStock}&start=${timeStart}&now=${timeNow}`)
      let data = await response.json()
      return data
    }
    catch (error) {
      console.log('Error fetching data from api')
    }
  }

  //fetches the stock's current change info
  const fetchStockChange = async () => {
    try {
      let response = await fetch(`/api/quote?ticker=${currStock}`)
      let data = await response.json()
      return data
    }
    catch (error) {
      console.log(`fetchStockChange: unable to grab data from server- ${error}`)
    }
  }

  //helper function to pull the interest stock ticker up to change state
  const helper = (arg) => {
    setIsLoading(true)
    setStockInfo([])
    setStock(arg)
  }

  const handleVisibilityChange = (isVisible) => {
    setPageIsVisible(isVisible)
  }

  const boxes = [];
  for (let key in stockStore) {
    boxes.push(<StockDisplay ticker={key} stockName={stockStore[key]} seeStock={helper}/>)
  }

  console.log(currStock)

  //render
  return (
    <div>
      {/* <div>{chart}</div> */}
      <Navbar />
      <div className="tickerBar">
        { isLoading ? <div>Loading...</div> :         
        <PageVisibility onChange={handleVisibilityChange}>
          {pageIsVisible && (
            <Ticker offset="run-in" speed={10} mode="chain">
              {({ index }) => (
                <>
                  {boxes[index % 16]}
                </>
              )}
            </Ticker>
          )}
        </PageVisibility>}
      </div>
      <div className="mainpage-container">
        <div className="stock-container">
          <p className="comp-name">{`${stockStore[currStock]} `}<span className="ticker-text">{`(NASDAQ: ${currStock})`}</span></p>
          <p id="price-text">{`${stockChange.c} `}<span id="usd-text">USD</span></p>
          {priceChange > 0 ? <p style={{color: "green"}}>{`+${priceChange} (${percentChange}%)`}</p> : <p style={{color: "red"}}>{`-${priceChange} (${percentChange}%)`}</p>}
          { isLoading ? <div>Loading...</div> : <ChartComponent data={currStockInfo}/> }
        </div>
      </div>
    </div>
  )
}

export default Home;
