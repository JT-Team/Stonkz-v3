import {createSlice} from '@reduxjs/toolkit'

export const stockSlice = createSlice({
  name: 'stocks',
  initialState: {
    currStock: 'AAPL',
    stockStore: {},
    currStockInfo: [],
    stockChange: {},
    priceChange: 0,
    percentChange: 0,
    news: [],
    isLoading: true,
    pageIsVisible: true
  },
  reducers: {
    setStockInfo: (state, action) => {
      state.currStockInfo = action.payload;
    },
    setStockStore: (state, action) => {
      state.stockStore = action.payload
    },
    setIsLoading: (state,action) => {
      state.isLoading =action.payload;
    },
    setStock: (state, action) => {
      state.currStock = action.payload;
    },
    setStockChange: (state, action)=> {
      state.stockChange = action.payload;
    },
    setPriceChange: (state, action)=> {
      state.priceChange = action.payload;
    },
    setPercentChange: (state, action) => {
      state.percentChange = action.payload;
    },
    setNews:(state, action)=>{
      state.news = action.payload;
    },
    setPageIsVisible: (state, action)=> {
      state.pageIsVisible = action.payload
    }
  }
  
})

export const { setStockInfo, setIsLoading, setStock, setStockStore,setStockChange, setPriceChange, setPercentChange, setNews, setPageIsVisible} = stockSlice.actions;

// having currStock from user for testing purpose only take the parameter after 
export const fetchStockData = (timeStart, timeNow) => {

  return async (dispatch, getState) => {
    try {
      // get state of the store from redux store
      const {currStock} = getState().stocks
      // fetch stock info from the api
      const response = await fetch(`/api?ticker=${currStock}&start=${timeStart}&now=${timeNow}`)
      let stock = await response.json();
      if (!stock.t.length) console.log(stock,"did not receive any data check the fetch call. ERROR fetchStockData ")
      let parseData = [];

      // sort the stock info from the api into usable form
      for (let i = 0; i < stock.t.length; i++) {
        parseData.push({time: stock.t[i], open: stock.o[i], high: stock.h[i], low: stock.l[i], close: stock.c[i]})
      }
      // save the data into the redux store
      dispatch(setStockInfo(parseData));
      dispatch(setIsLoading(false))
      return 
    }catch(err) {
      console.log(err)
      const error = {
        log:`executed at client/home.jsx fetchStockData Error check stockSlice.js for function logic`,
        err: err
      }
      console.error(JSON.stringify(error))
    }
  }
}

export const fetchStockChange = ()=> {

  return async (dispatch, getState) =>{
    try {
      // get current stock target from the state
      const {currStock} = getState().stocks

      // fetch the stock ticker data from the api
      let response = await fetch(`/api/quote?ticker=${currStock}`)
      let data = await response.json();
      if (!data.c) console.log(`fetchStockChange function err no data received: ${JSON.stringify(data)}`)
      
      // sync the data to the redux store using thunk
      dispatch(setStockChange(data))
      dispatch(setPriceChange(Math.round((data.c-data.o) * 100)/100))
      dispatch(setPercentChange(Math.round(data.dp * 1000)/100))
    }catch(err) {
      console.log(err)
      const error ={
        log: 'executed at client/home.jsx fetchStockChange Error check stockSlice.js for function logic',
        err: err
      }
      console.error(JSON.stringify(error))
    }
  }
}

export const fetchStock = () =>{

  return async (dispatch, getState) => {
    try {
      // send fetch request to the server to fetch designated local stock list saved as json file 
      const response = await fetch('api/stocks')
      const data = await response.json();
      if (!data) console.log('fetch request was not properly executed')

      dispatch(setStockStore(data));
    }catch(err) {
      console.log(err)
      const error ={
        log: 'executed at client/home.jsx fetchStock Error check stockSlice.js for function logic',
        err: err
      }
      console.error(JSON.stringify(error))
    }
  }
}


export default stockSlice.reducer