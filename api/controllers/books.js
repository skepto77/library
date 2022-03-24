import { BooksRepository } from '../books/books.repository';
import { container } from '../container.js';

const repository = container.get(BooksRepository);

const addBook = async (req, res) => {
  try {
    const book = await repository.createBook(req.body);
    res.status(201).json(book);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: `Ошибка добавления книги` });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await repository.createBook(req.id);
    res.status(200).json(book);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: `Книга не найдена` });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await repository.getBook();
    res.status(200).json(books);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: `err` });
  }
};

const editBook = async (req, res) => {
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
  try {
    const book = await repository.updateBook(id, req.body);
    res.status(200).json(book);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: `Ошибка обновления книги` });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await repository.deleteBook(id);
    res.status(200).json({ message: `Книга удалена` });
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: `Ошибка удаления книги` });
  }
};

const downloadBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = 'fix later';
    // const book = await Book.findById(id);
    //res.download(`uploads/${books[idx].fileBook}`);
    res.download(`${process.cwd()}/uploads/${book.fileName}`);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: `Книга не найдена` });
  }
};

export { getBooks, getBookById, downloadBook, addBook, editBook, deleteBook };
