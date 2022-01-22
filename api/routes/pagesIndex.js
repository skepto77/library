import express from 'express';
const router = express.Router({ mergeParams: true });
import axios from 'axios';

const API_HOST = process.env.API_HOST || 'localhost';

const renderIndex = async (req, res) => {
  try {
    const { data } = await axios.get(`${API_HOST}/books/`);
    res.render('pages/index', {
      title: 'Главная',
      books: data,
    });
  } catch (err) {
    console.log(err);
  }
};

router.route('/').get(renderIndex);

export default router;
