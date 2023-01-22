import React, { Component, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ChartComponent from './subComponents/ChartComponent.jsx'
import Navbar from './subComponents/Navbar.jsx'

const Home = () => {
  const [currStock, setStock] = useState('AAPL')
  const [currStockInfo, setStockInfo] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    fetchData().then(stock => {
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
  }, [currStock])

  const fetchData = async () => {
    try {
      let response = await fetch(`/api?ticker=${currStock}`)
      let data = await response.json()
      return data
    }
    catch (error) {
      console.log('Error fetching data from api')
    }
  }

  return (
    <div>
      <div>{chart}</div>
      <Navbar />
      { isLoading ? <div>Loading...</div> : <ChartComponent data={currStockInfo}/> }
    </div>
  )
}

export default Home;
