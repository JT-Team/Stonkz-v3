const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../lib/passwordUtils').genPassword;
const User = require('../config/database');
// const isAuth = require('../controllers/authController').isAuth;

/**
 * -------------- POST ROUTES ----------------
 */

 router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('success')
  res.send("success");
});

// router.get('/', isAuth, (req, res, next) => { 
//     res.status(200).send('worked');
// })

 router.post('/register', (req, res, next) => {
  const saltHash = genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.username,
    hash: hash,
    salt: salt
  })

  newUser.save()
    .then(user => {
      console.log(user)
    })
    res.send('success')
 });


 // Get routes

 router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.send('success');
  });
});


module.exports = router;