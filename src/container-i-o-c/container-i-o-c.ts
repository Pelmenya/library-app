import 'reflect-metadata';
import { Container } from 'inversify';

import { BooksController } from '../controllers/books-controller';

const containerIoC = new Container();

containerIoC.bind(BooksController).toSelf();

export { containerIoC };