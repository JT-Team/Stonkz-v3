# Iteration Project

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

##### /api
  - **GET /**: 
    - Request gets routed through `finnhubController.getStockChange`, which  
  - **GET /quote**:  
  - **GET /stocks**:  



##### /user





## Known bugs/quirks/fixes

### Issues

**Data does not render on load**: Go to your network tab in devtools, if the call to the `/api?[tickerInfo]` route is not responding, your problem is probably with your `node-fetch` module. Try deprecating your installed version of `node-fetch` to `node-fetch@2`.