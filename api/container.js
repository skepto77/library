import { Container, decorate, injectable } from 'inversify';
import 'reflect-metadata';

import { IBooksRepository } from './books/books.repository.interface.js';
import { BooksRepository } from './books/books.repository.js';

export const container = new Container();
// container.bind<IBooksRepository> BooksRepository.toSelf();

decorate(injectable(), BooksRepository);
container.bind(BooksRepository).toSelf();
