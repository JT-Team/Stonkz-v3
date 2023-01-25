const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api');
const app = express();
const PORT = 3000;
const cors = require('cors');
const { send } = require('process');
require('dotenv').config();

app.all("*", (req, res, next) => {
  console.log("req.session", req.session)
  console.log("req.user", req.user)
  next();
});


// middleware
app.use(express.json());
app.use(cookieParser());
// app.use((data => {console.log(data.body)})())
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send(200)
});



app.use(express.static(path.resolve(__dirname, '../client')));




app.use(session({
  secret: process.env.SECRET,
  resave: true,
  // name: "helloImACookie",
  httpOnly: false,
  saveUnitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))

// s:A0BcW1SZ9lWYz0Dn0P4m8Va0x6jYTJ2zj.9ghkmWMtF8lfL3yficJPTdz3vTq0JqL1sF44dSTDNnc
// s%3A-XMcLqu8oklK7KY6cI3peNVQFJ-8Shrb.52Ryw4FQcvoko%2FmCnrw3ae8%2BHq1ypLlQbIjxKaalmjU

// Passport auth
 require('./config/passport')
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(authRouter);
app.use('/api', apiRouter);



// Uknown route handler
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});



app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;