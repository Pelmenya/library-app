import { createBook, deleteBook, getBook, getBooks, updateBook } from '../controllers/books-controller';
import { Router } from 'express';
import { Books } from './routes';

const { BOOKS, ID } = Books;


const booksRouter = Router();

booksRouter.get(`${BOOKS}`, getBooks);

booksRouter.get(`${BOOKS}${ID}`, getBook);

booksRouter.post(`${BOOKS}`, createBook);

booksRouter.put(`${BOOKS}${ID}`, updateBook);

booksRouter.delete(`${BOOKS}${ID}`, deleteBook);

export { booksRouter };