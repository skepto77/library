import { v4 as uuidv4 } from 'uuid';
import Book from '../models/books.js';

const getBooks = async (req, res) => {
  try {
    const books = await Book.find().select('-__v');
    res.status(200).json(books);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: `err` });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).select('-__v');
    res.status(200).json(book);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: `Книга не найдена` });
  }
};

const downloadBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    //res.download(`uploads/${books[idx].fileBook}`);
    res.download(`${process.cwd()}/uploads/${book.fileName}`);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: `Книга не найдена` });
  }
};

const addBook = async (req, res) => {
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
  try {
    const book = await Book.create({
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
    });
    res.status(201).json(book);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: `Ошибка добавления книги` });
  }
};

const editBook = async (req, res) => {
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(id, {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
    });
    res.status(200).json(book);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: `Ошибка обновления книги` });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await Book.deleteOne({ _id: id });
    res.status(200).json({ message: `Книга удалена` });
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: `Ошибка удаления книги` });
  }
};

export { getBooks, getBookById, downloadBook, addBook, editBook, deleteBook };
