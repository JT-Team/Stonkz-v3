import React, { Component, useState, useEffect } from 'react'
import Chart from '@qognicafinance/react-lightweight-charts'

class ChartComponent extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        options: {
          alignLabels: true,
          timeScale: {
            rightOffset: 12,
            barSpacing: 3,
            fixLeftEdge: true,
            lockVisibleTimeRangeOnResize: true,
            rightBarStaysOnScroll: true,
            borderVisible: false,
            borderColor: "#fff000",
            visible: true,
            timeVisible: true,
            secondsVisible: false
          }
        },
        candlestickSeries: [{
          data: this.props.data
        }]
      }
    }
    render() {
        console.log(this.props.data)
        return (
          <Chart options={this.state.options} candlestickSeries={this.state.candlestickSeries} autoWidth height={320} />
        )
    }
}

export default ChartComponent;