import express from 'express';
const router = express.Router({ mergeParams: true });
import passport from 'passport';
import { getUserById } from '../controllers/users.js';

router.get('/login', (req, res) => {
  res.render('pages/login', {
    title: 'Вход',
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect('/');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log(user);
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      return res.status(400).json({ errors: 'Пользователь не найден' });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(400).json({ errors: err });
      }
      // return res.status(201).json({
      //   user: user,
      //   session: req.session,
      //   'req.user': req.user,
      // });

      res.redirect('/');
    });
  })(req, res, next);
});

router.get(
  '/profile',
  (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      console.log('req.isAuthenticated fail');
      if (req.session) {
        req.session.returnTo = req.originalUrl || req.url;
      }
    }
    next();
  },
  (req, res) => {
    console.log('req.user', req.user);
    // res.status(200).json({
    //   user: req.user,
    //   session: req.session,
    //   'req.user': req.user,
    // });
    res.render('pages/profile', {
      title: 'Профиль пользователя',
    });
  }
);

router.route('/:id').get(getUserById);

export default router;
