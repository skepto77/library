import express from 'express';
const router = express.Router({ mergeParams: true });
import axios from 'axios';
import { store } from '../controllers/books.js';
import uploadFile from '../middleware/uploadFile.js';

const { books } = store;

const renderIndex = (req, res) => {
  res.render('pages/index', {
    title: 'Главная',
    books,
  });
};

const renderBook = (req, res) => {
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);
  res.render('pages/details', {
    title: books[idx].title,
    book: {},
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
      const result = await axios.post(`${process.env.API_HOST}/books/`, {
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
      const result = await axios.put(`${process.env.API_HOST}/books/${req.params.id}`, req.body);
      if (res.statusCode == 200) {
        res.redirect('/');
      }
    } catch (err) {
      console.log(err);
    }
  });

router.route('/').get(renderIndex);
router.route('/:id').get(renderBook);

export default router;
