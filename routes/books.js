import express from 'express';
const router = express.Router({ mergeParams: true });
import {
  getBooks,
  getBookById,
  downloadBook,
  addBook,
  editBook,
  deleteBook,
} from '../controllers/books.js';
import uploadFile from '../middleware/uploadFile.js';

router.route('/').get(getBooks);
router.route('/:id').get(getBookById);
router.route('/:id/download').get(downloadBook);
router.route('/').post(uploadFile, addBook);
router.route('/:id').put(editBook);
router.route('/:id').delete(deleteBook);

export default router;
