import { v4 as uuidv4 } from 'uuid';

const store = {
  books: [],
};

const newBook = {
  id: uuidv4(),
  title: '',
  description: '',
  authors: '',
  favorite: '',
  fileCover: '',
  fileName: '',
  fileBook: null,
};

[1, 2, 3].map((el) => {
  const tmp = { ...newBook };
  Object.keys(tmp).forEach((key) => {
    tmp[key] = `book ${key} ${el}`;
  });
  tmp.id = uuidv4();
  tmp.fileBook = null;
  store.books.push(tmp);
});

const getBooks = async (req, res) => {
  const { books } = store;
  res.json(books);
};

const getBookById = async (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    res.json(books[idx]);
  } else {
    res.status(404).json({ message: `Книга не найдена` });
  }
};

const downloadBook = async (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    res.download(`uploads/${books[idx].fileBook}`);
  } else {
    res.status(404).json({ message: `Книга не найдена` });
  }
};

const addBook = async (req, res) => {
  const { books } = store;
  const fileBook = req.file ? req.file.filename : null;
  const book = { ...newBook, fileBook, ...req.body };
  books.push(book);
  res.json(book);
};

const editBook = async (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    books[idx] = { ...books[idx], ...req.body };
    res.json(books[idx]);
  } else {
    res.status(404).json({ message: `Книга не найдена` });
  }
};

const deleteBook = async (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
    res.json('ok');
  } else {
    res.status(404).json({ message: `Книга не найдена` });
  }
};

export { getBooks, getBookById, downloadBook, addBook, editBook, deleteBook, store };
