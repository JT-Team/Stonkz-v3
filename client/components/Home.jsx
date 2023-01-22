import React, { Component, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './subComponents/Navbar.jsx'
import { createChart } from 'lightweight-charts'

const Home = () => {
  const [currStock, setStock] = useState('AAPL')
  const [currStockInfo, setStockInfo] = useState([])

  useEffect(() => {
      fetch(`/api?ticker=${currStock}`)
        .then(res => res.json())
        .then(data => {
          console.log(data)
        })
  }, [currStock])

  // const graph = document.getElementsByClassName('graph-container')
  const chart = createChart({ width: 400, height: 300 });
  const lineSeries = chart.addLineSeries();
  lineSeries.setData([
      { time: '2019-04-11', value: 80.01 },
      { time: '2019-04-12', value: 96.63 },
      { time: '2019-04-13', value: 76.64 },
      { time: '2019-04-14', value: 81.89 },
      { time: '2019-04-15', value: 74.43 },
      { time: '2019-04-16', value: 80.01 },
      { time: '2019-04-17', value: 96.63 },
      { time: '2019-04-18', value: 76.64 },
      { time: '2019-04-19', value: 81.89 },
      { time: '2019-04-20', value: 74.43 },
  ]);

  return (
    <div>
      <div>{chart}</div>
      <Navbar />
    </div>
  )
}

export default Home;
