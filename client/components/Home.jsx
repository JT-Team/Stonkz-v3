import React, { Component, useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ChartComponent from './subComponents/ChartComponent.jsx'
import Navbar from './subComponents/Navbar.jsx'
import StockDisplay from './subComponents/StockDisplay.jsx'
import Ticker from 'react-ticker'
import PageVisibility from 'react-page-visibility'
import NewsComponent from './subComponents/NewsComponent.jsx'
import { setIsLoading, setStockInfo, fetchStockData, fetchStockChange, fetchStock, setStock} from '../stockSlice.js'

const Home = () => {

  const {currStockInfo, isLoading, stockChange, priceChange, percentChange, stockStore ,currStock} = useSelector((state=>state.stocks))
  const dispatch = useDispatch();
  //big list of states... sorry...
  // const [currStock, setStock] = useState('AAPL')
  // const [stockStore, setStockStore] = useState({})
  // const [currStockInfo, setStockInfo] = useState([])
  // const [stockChange, setStockChange] = useState({})
  // const [priceChange, setPriceChange] = useState(0)
  // const [percentChange, setPercentChange] = useState(0)
  const [news, setNews] = useState([])
  // const [isLoading, setIsLoading] = useState(true)
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
    
    dispatch(fetchStockData(timestampStart, timestampNow))
    dispatch(fetchStockChange())
    dispatch(fetchStock())


     //fetch list of news 
     fetchStockNews().then(news => {
      let parseData = [];
      for (let i = 0; i < news.data.length; i++) {
        parseData.push(news.data[i]);
      }
      return parseData;
    })
      .then((parseData) => {
        setNews([...parseData])
      })
      .catch((error) => {
        console.log(`fetchStockNews: unable to grab data from server- ${error}`)
      })
  }, [])

  
  const fetchStockNews = async () => {
    try {
      let response = await fetch(`https://stocknewsapi.com/api/v1?tickers=${currStock}&items=3&page=1&token=o2tzmxblhimm5ryj0kmzuiitetygsqpqg9qgivan`, {method:'GET', mode: 'no-cors'})
      let data = await response.json()
      return data
      }
    catch (error) {
      console.log('Error fetching news from api')
      }
    }

  //helper function to pull the interest stock ticker up to change state
  const helper = (arg) => {
    dispatch(setIsLoading(true))
    dispatch(setStockInfo([]))
    dispatch(setStock(arg))
  }

  //will refresh the ticker bar whenever you go in and out of the page
  const handleVisibilityChange = (isVisible) => {
    setPageIsVisible(isVisible)
  }

  // creates all the buttons on the ticker bar on top
  const boxes = [];
  for (let key in stockStore) {
    boxes.push(<StockDisplay ticker={key} stockName={stockStore[key]} seeStock={helper}/>)
  }

  //render
  return (
    <div className="homepage-container">
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
        <h3>News</h3>
        <NewsComponent news={news} />
      </div>
    </div>
  )
}

export default Home;
