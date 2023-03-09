// this is making isAuthenticated into middleware

module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated())  {
    next();
  } else {
    res.status(401).json({ msg: 'you are not authorized to view this resourse'})
  }
}