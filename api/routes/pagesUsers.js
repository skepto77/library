import express from 'express';
const router = express.Router({ mergeParams: true });
import axios from 'axios';
// import ensureAuthenticated from '../middleware/ensureAuthenticated.js';

axios.defaults.withCredentials = true;
const COUNTER_HOST = process.env.COUNTER_HOST || 'localhost';
const API_HOST = process.env.API_HOST || 'localhost';

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.route('/profile').get(async (req, res) => {
  console.log('profile page');
  console.log('req.session', req.session);
  try {
    const result = await axios.get(`${API_HOST}/user/profile`, { withCredentials: true });

    console.log(`result profile: ${JSON.stringify(result.data.user)}`);

    res.render('pages/profile', {
      title: 'Профиль пользователя',
      user: { ...result.data.user },
    });
  } catch (err) {
    console.log(err);
  }
});

router
  .route('/login')
  .get(async (req, res) => {
    console.log('login page');
    try {
      res.render('pages/login', {
        title: 'Вход',
      });
    } catch (err) {
      console.log(err);
    }
  })
  .post(async (req, res) => {
    try {
      const result = await axios.post(
        `${API_HOST}/user/login`,
        { ...req.body },
        { withCredentials: true }
      );
      console.log(`resultpost1: ${JSON.stringify(result.data)}`);
      console.log(`resultpost2: ${result.data.user.username}`);
      if (result.data.user.username) {
        res.redirect('/');
      }
    } catch (err) {
      console.log(err);
    }
  });

export default router;
