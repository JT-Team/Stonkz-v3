// this is passport js configuration -> if you're not familiar with this check out some youtube videos, the documentation isn't great

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./database');
const validPassword = require('../lib/passwordUtils').validPassword;

const customFields = {
  usernameField: 'username',
  passwordField: 'password',
};

const verifyCallback = (username, password, done) => {
  User.findOne({username: username})
    .then(user => {
      if (!user) return done(null, false);
      const isValid = validPassword(password, user.hash, user.salt);
      if (isValid) return done(null, user);
      else return done(null, false);
    })
    .catch(err => {
      done(err);
    })
}

const strategy = new LocalStrategy(customFields, verifyCallback)
passport.use(strategy)


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then(user => {
      done(null, user);
    })
    .catch(err => done(err))
});