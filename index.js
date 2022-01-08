import express from 'express';
import bodyParser from 'body-parser';
import Book from './models/Book.js';

const store = {
  books: [],
};

[1, 2, 3].map((el) => {
  const newBook = new Book(
    `${el}`,
    `title ${el}`,
    `description ${el}`,
    `authors ${el}`,
    `favorite ${el}`,
    `fileCover ${el}`,
    `fileName ${el}`
  );
  store.books.push(newBook);
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/user/login', (req, res) => {
  res.status(201).json({ id: 1, mail: 'test@mail.ru' });
});

app.get('/api/books', (req, res) => {
  const { books } = store;
  res.json(books);
});

app.get('/api/books/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    res.json(books[idx]);
  } else {
    res.status(404).json({ message: `Книга не найдена` });
  }
});

app.post('/api/books', (req, res) => {
  const { books } = store;
  const { title } = req.body;
  const idx = books.length + 1;
  const book = new Book(idx, title);
  books.push(book);
  res.json(book);
});

app.put('/api/books/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const { title } = req.body;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    books[idx] = { ...books[idx], title };
    res.json(books[idx]);
  } else {
    res.status(404).json({ message: `Книга не найдена` });
  }
});

app.delete('/api/books/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
    res.json('ok');
  } else {
    res.status(404).json({ message: `Книга не найдена` });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Сервер запущен на порту ${PORT}`));
