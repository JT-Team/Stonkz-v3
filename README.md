# Investment learning platform for beginners

## Documentation

### Basic File Structure

- Client
  - index.html
  - index.js
  - Assets
    - Styles.css
  - Components
    - Home.jsx
    - Login.jsx
    - Settings.jsx
    - Signup.jsx
- Server
  - Config
    - database.js
    - passport.js
  - Controllers
    - authController.js
    - finnhubController.js
  - Lib
    - passwordUtils.js
  - Routes
    - api.js
    - auth.js
  - server.js
- Stocks
  - stocks.json

### Backend Overview

The backend is an Express server built on top of Node.js. It uses Mongoose as a database and Passport.js to handle authentication.

#### Endpoints:

**/api** `api.js`
  - **GET /**: 
    - Triggered [when?]
    - Routed through `finnhubController.getStockData`, which sends a request to finnhub's API with ticker, start time, and current time passed into the request via the query parameters. The response of the fetch is sent to the user. 
  - **GET /quote**:
    - Triggered [when?]
    - Routed through `finnhubController.getStockChange`, which sends a request to finnhub's API only asking for the current[?] info. Response gets sent back to user.
  - **GET /stocks**:  
    - Triggered [when?]
    - Routed through `finnhubController.getStockList`, which returns the stock list contained in `stocks.json`.


**/auth** `auth.js`
  - **POST /login**:
    - Triggered [when?]
    - Routed through `passport.authenticate`, which uses passport's `LocalStrategy` strategy. After verification, this returns success [improve this]
  - **POST /register**:
    - Triggered [when?]
    - Generates a saltHash object with the `genPassword` function from `passwordUtils.js`. This function takes 3 steps
      1. *Creating the salt:* The function uses the `crypto` library's `randomBytes` function to generate 32 random bytes of data as a buffer and then converts that into a hex string to assign to `salt`. 
      2. *Generating the hashed pw*: Using the `crypto` library's `pbkdf2Sync` function, the hash is generated by passing in the original password, the salt we just generated, an iteration count of 10,000, a key length of 64, and a "digest" (hashed output) of sha512. It passes that result into the `genHash` variable.
      3. *Constructing the user pw object for saving*: The function returns an object with the generated salt and hash (keys: `salt` and `hash`).
    - Uses the salt and hash properties of the generated object as well as the user's submitted username to create a new user with the User model from `database.js`, which saves the values in a MongoDB and sends a success message on completion.

  - **GET /logout**:
    - Triggered [when?]
    - Invokes the `req.logout` method and sends a success message if successful. [what is the `.logout` method?]

#### Middleware In Use:
**express** middleware:
  - json()
  - urlEncoded()
  - static() (directing to client)
**cookie-parser** - Parses cookies
**cors** - Handles CORS requests
**passport** - Handles login and auth
**express-session** - Creates a session


### Frontend Overview [may need updaing post-redux implementation]

#### client/index.js
  state:
    userInfo:{username ,password ,authenticated}

  cookie: passport login session
  routes: 
    privateRoutes: redirects the user depending on the authentication status
    login/signup: signup and login through this page if not logged in you will be redirected to this page

  issues:
    [ ] : fix cookie problem with the login state on refresh
    [ ] : privateRoutes: this does not work properly currently whenever refreshes the login state does not persist. The problems suspected to be coming from cookies not persisting upon refreshing 
    [ ] : login routes and signup routes can be joinned into one page with state distinguishing login state and signup state.

#### client/login & signup:
  uses mui/material npm package to create compounents 
  handles login and signup logic 
  requests are sent to server to handle encription
  state: 
    - username:
    - password: 
    - cookie: this state was not used

  props:
    updateUserInfo: was used to update authentication state

#### client/home.jsx
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

## Known bugs/quirks/fixes

### Issues

**Data does not render on load**: Go to your network tab in devtools, if the call to the `/api?[tickerInfo]` route is not responding, your problem is probably with your `node-fetch` module. Try deprecating your installed version of `node-fetch` to `node-fetch@2`.

### Bugs

**Reload auth logic**: Depending on setup, hitting reload while logged in the page will either kick you to the login screen OR not do so but expose the `/` route to anyone even if they are not logged in.