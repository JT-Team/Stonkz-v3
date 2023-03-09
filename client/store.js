import {configureStore} from '@reduxjs/toolkit'
import stockReducer from './stockSlice'


export default configureStore({
  reducer: {
    stocks: stockReducer
  }
})