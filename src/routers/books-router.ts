import { createBook, deleteBook, downLoadBook, getBook, getBooks, updateBook } from '../controllers/books-controller';
import { Router } from 'express';
import { BooksRoutes } from './routes';

const { BOOKS, ID, DOWNLOAD } = BooksRoutes;

const booksRouter = Router();

booksRouter.get(`${BOOKS}`, getBooks);

booksRouter.get(`${BOOKS}${ID}`, getBook);

booksRouter.post(`${BOOKS}`, createBook);

booksRouter.put(`${BOOKS}${ID}`, updateBook);

booksRouter.delete(`${BOOKS}${ID}`, deleteBook);

booksRouter.get(`${BOOKS}${ID}${DOWNLOAD}`, downLoadBook);

export { booksRouter };