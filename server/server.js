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
require('dotenv').config();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client')));

// Session middleware - look into express sessions 
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUnitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))

// Passport auth
 require('./config/passport')
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/user',authRouter);
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