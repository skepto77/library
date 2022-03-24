import { IBooksRepository } from './books.repository.interface';
import { IBook } from './book.interface';
import Book from './books.model';
export class BooksRepository implements IBooksRepository {
  static async createBook(book: IBook): Promise<IBook> {
    try {
      return await Book.create(book);
    } catch (e) {
      console.log(e);
    }
  }

  static async getBook(id: number): Promise<IBook | null> {
    try {
      return await Book.findById(id).select('-__v');
    } catch (e) {
      console.log(e);
    }
  }

  static async getBooks() {
    try {
      return await Book.find().select('-__v');
    } catch (e) {
      console.log(e);
    }
  }

  static async updateBook(id: number, data: IBook) {
    const { title, description, authors, favorite, fileCover, fileName } = data;
    try {
      const book = await Book.findByIdAndUpdate(id, {
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
      });
      return book;
    } catch (e) {
      console.error(e);
      return `Ошибка обновления книги`;
    }
  }

  static async deleteBook(id: number) {
    try {
      return await Book.deleteOne({ _id: id });
    } catch (e) {
      console.error(e);
      return `Ошибка удаления книги`;
    }
  }
}
