function ensureAuthenticated(req, res, next) {
  console.log('req.user', req.user);
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/');
  }
}

export default ensureAuthenticated;
