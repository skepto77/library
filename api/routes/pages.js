import express from 'express';
const router = express.Router({ mergeParams: true });
import axios from 'axios';
import { store } from '../controllers/books.js';
import uploadFile from '../middleware/uploadFile.js';

const { books } = store;

const COUNTER_HOST = process.env.COUNTER_HOST || 'localhost';
const API_HOST = process.env.API_HOST || 'localhost';

console.log(COUNTER_HOST);

const renderIndex = (req, res) => {
  res.render('pages/index', {
    title: 'Главная',
    books,
  });
};

const renderAddBook = (req, res) => {
  res.render('pages/addBook', {
    title: 'Добавление книги',
  });
};

const renderEditBook = (req, res) => {
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);
  res.render('pages/editBook', {
    title: 'Редактирование книги',
    book: books[idx],
  });
};

router
  .route('/add')
  .get(renderAddBook)
  .post(uploadFile, async (req, res) => {
    try {
      const fileBook = req.file ? req.file.filename : null;
      const result = await axios.post(`${API_HOST}/books/`, {
        ...req.body,
        fileBook,
      });
      if (res.statusCode == 200) {
        res.redirect('/');
      }
    } catch (err) {
      console.log(err);
    }
  });

router
  .route('/edit/:id')
  .get(renderEditBook)
  .post(uploadFile, async (req, res) => {
    try {
      const fileBook = req.file ? req.file.filename : null;
      const result = await axios.put(`${API_HOST}/books/${req.params.id}`, {
        ...req.body,
        fileBook,
      });
      if (res.statusCode == 200) {
        res.redirect('/');
      }
    } catch (err) {
      console.log(err);
    }
  });

router.route('/').get(renderIndex);

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);
  let cnt = 0;

  try {
    await axios.post(`${COUNTER_HOST}/counter/${id}/incr`);
    const result = await axios.get(`${COUNTER_HOST}/counter/${id}`);
    cnt = result.data.cnt ? result.data.cnt : cnt;
  } catch (err) {
    console.log(err);
  }

  res.render('pages/details', {
    title: 'Book',
    book: {},
    count: cnt,
  });
});

export default router;
