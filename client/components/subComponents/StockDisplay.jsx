import React, { Component, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const StockDisplay = (props) => {

  const [priceChange, setPriceChange] = useState(0)
  const [percentChange, setPercentChange] = useState(0)

  useEffect(() => {
    //fetch current stock change info
    console.log('ran')
    fetchStockChange().then(data => {
      setPriceChange(Math.round((data.c - data.o) * 100 ) / 100)
      setPercentChange(Math.round(data.dp * 100) / 100)
    })
    .catch((error) => {
      console.log(`fetchStockChange: unable to grab data from server- ${error}`)
    })
  }, [])

  //helper function to change the currStock state in Home
  const changeStock = () => {
    props.seeStock(props.ticker)
  }

  //fetches the stock's current change info
  const fetchStockChange = async () => {
    try {
      let response = await fetch(`/api/quote?ticker=${props.ticker}`)
      let data = await response.json()
      return data
    }
    catch (error) {
      console.log(`fetchStockChange: unable to grab data from server- ${error}`)
    }
  }

  return(
    <div>
      <button className="ticker-btn" onClick={changeStock}>
        {`${props.ticker} (${props.stockName})`}
        {priceChange > 0 ? <p style={{color: "green"}}>{`+${priceChange} (${percentChange}%)`}</p> : <p style={{color: "red"}}>{`-${priceChange} (${percentChange}%)`}</p>}
      </button>
    </div>
  )
}

export default StockDisplay;