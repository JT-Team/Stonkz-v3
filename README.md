# Iteration

client/index.js
  state:
    userInfo:{username ,password ,authenticated}

  cookie: passport login session
  routes: 
    privateRoutes: redirects the user depending on the authentication status
    login/signup: signup and login through this page if not logged in you will be redirected to this page


    [ ] : fix cookie problem with the login state on refresh
    [ ] : privateRoutes: this does not work properly currently whenever refreshes the login state does not     persist. The problems suspected to be coming from cookies not persisting upon refreshing 
    [ ] : login routes and signup routes can be joinned into one page with state distinguishing login state and signup state.

client/login & signup:
  used mui/material npm package to create compounents 
  handles login and signup logic 
  requests are sent to server to handle encription
  state: 
    - username:
    - password: 
    - cookie: this state was not used

  props:
    updateUserInfo: was used to update authentication state

client/home.jsx
  state:
     - currStock, setStock
     - stockStore, setStockStore
     - currStockInfo, setStockInfo
     - stockChange, setStockChange
     - priceChange, setPriceChange
     - percentChange, setPercentChange
     - news, setNews
     - isLoading, setIsLoading
     - pageIsVisible, setPageIsVisible

  reducers:
    - fetchStockData
        - updates currStockInfo with stock data fetched from GET/api route
            - expected data is information of stock price 
        - updates isLoading state 
    - fetchStockChange
        - updates stockChange
        - updates priceChange
        - 