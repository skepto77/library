import express from 'express';
const router = express.Router({ mergeParams: true });
import passport from 'passport';

router.post('/login', (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    console.log(user);
    if (err) {
      console.log('login err');
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      console.log('!user err');
      return res.status(400).json({ errors: 'Пользователь не найден' });
    }
    console.log(info);
    req.logIn(user, function (err) {
      if (err) {
        console.log('logIn login err3');
        return res.status(400).json({ errors: err });
      }
      // return res.status(200).json({ success: `Выполнен вход ${user.id}` });
      return res.status(201).json({
        user: user,
        session: req.session,
        'req.user': req.user,
      });
    });
  })(req, res, next);
});

router.get(
  '/profile',
  function (req, res, next) {
    console.log('req.user', req.user);
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      console.log('req.isAuthenticated fail');
    }
    next();
  },
  function (req, res) {
    console.log('req.user', req.user);
    res.status(200).json({
      user: req.user,
      // session: req.session,
      'req.user': req.user,
    });
  }
);

router.get('/login', (req, res) => {
  console.log('api login page');
  res.render('pages/login', {
    title: 'Вход',
  });
});

router.get(
  '/me',
  (req, res, next) => {
    console.log('api profile page');
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      if (req.session) {
        req.session.returnTo = req.originalUrl || req.url;
      }
      return res.redirect('/api/user/login');
    }
    next();
  },
  function (req, res) {
    res.render('pages/profile', { title: 'Профиль пользователя', user: req.user });
  }
);

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/api/user/login');
});

export default router;
