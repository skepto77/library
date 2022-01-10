import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import pagesRoutes from './routes/pages.js';
import usersRoutes from './routes/users.js';
import booksRoutes from './routes/books.js';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use('/', pagesRoutes);
app.use('/books', pagesRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/user', usersRoutes);

app.use((err, req, res, next) => {
  res.status(404);
  if (err.statusCode === 404) {
    res.render('pages/404', {
      title: '404',
    });
  }

  if (err.statusCode === 500) {
    res.render('pages/500', {
      title: '500',
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Сервер запущен на порту ${PORT}`));
