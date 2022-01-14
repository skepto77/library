import express from 'express';
const router = express.Router({ mergeParams: true });
import axios from 'axios';
import uploadFile from '../middleware/uploadFile.js';

const COUNTER_HOST = process.env.COUNTER_HOST || 'localhost';
const API_HOST = process.env.API_HOST || 'localhost';

console.log(COUNTER_HOST);

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

const renderAddBook = (req, res) => {
  res.render('pages/addBook', {
    title: 'Добавление книги',
  });
};

const renderEditBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(`${API_HOST}/books/${id}`);
    res.render('pages/editBook', {
      title: 'Редактирование книги',
      book: data,
    });
  } catch (err) {
    console.log(err);
  }
};

router
  .route('/add')
  .get(renderAddBook)
  .post(uploadFile, async (req, res) => {
    try {
      console.log(req.file);
      const fileName = req.file ? req.file.filename : null;
      const result = await axios.post(`${API_HOST}/books/`, {
        ...req.body,
        fileName,
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
      const fileName = req.file ? req.file.filename : null;
      const result = await axios.put(`${API_HOST}/books/${req.params.id}`, {
        ...req.body,
        fileName,
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
  try {
    const { data } = await axios.get(`${API_HOST}/books/${id}`);
    await axios.post(`${COUNTER_HOST}/counter/${id}/incr`);
    const {
      data: { cnt },
    } = await axios.get(`${COUNTER_HOST}/counter/${id}`);
    res.render('pages/details', {
      title: data.title,
      book: data,
      count: cnt,
    });
  } catch (err) {
    console.log(err);
  }
});

router.route('/:id/delete').get(async (req, res) => {
  try {
    await axios.delete(`${API_HOST}/books/${req.params.id}`);
    if (res.statusCode == 200) {
      res.redirect('/');
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
