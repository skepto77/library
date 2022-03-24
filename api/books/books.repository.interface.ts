import { IBook } from './book.interface';

export interface IBooksRepository {
  createBook?: (book: IBook) => Promise<IBook>;
  getBook?: (id: number) => Promise<IBook | null>;
  getBooks?: () => Promise<Array<IBook>>;
  updateBook?: (id: number) => Promise<IBook | string>;
  deleteBook?: (id: number) => any;
}
