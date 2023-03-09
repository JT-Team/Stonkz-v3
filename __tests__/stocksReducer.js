import subject, { 
  setStockInfo, 
  setIsLoading, 
  setStock, 
  setStockStore,
  setStockChange, 
  setPriceChange, 
  setPercentChange, 
  setNews, 
  setPageIsVisible
} from '../client/stockSlice.js'

describe('Stocks Reducer', () => {
  
  let state
  beforeEach(()=>{
    state = {
      currStock: 'AAPL',
      stockStore: {},
      currStockInfo: [],
      stockChange: {},
      priceChange: 0,
      percentChange: 0,
      news: [],
      isLoading: true,
      pageIsVisible: true
    }
  })

  describe('default state', () => {
    it('should return a initial state', () =>{
      expect(subject(undefined, {type: undefined})).toEqual(state)
    })
  })

  describe('unrecognized action type',() =>{
    it('should return the original without any duplication', () => {
      const action ={type: "asdfl;jqweiou"}
      expect(subject(state,action)).toBe(state)
      
    })
  })

  describe("setStockInfo", ()=> {
    it('shoud create currect action', ()=>{
      expect(setStockInfo([])).toEqual({type:'stocks/setStockInfo', payload: []})
    })
    it('should update the state', ()=> {
      expect(subject(state, setStockInfo(['if you found this good job']))).toEqual({...state, currStockInfo: ['if you found this good job']})
    })
  })

  describe("setIsLoading", ()=> {
    it('shoud create currect action', ()=>{
      expect(setIsLoading(false)).toEqual({type:'stocks/setIsLoading', payload: false})
    })
    it('should update the state', ()=> {
      expect(subject(state, setIsLoading(false))).toEqual({...state, isLoading: false})
    })
  })
})
