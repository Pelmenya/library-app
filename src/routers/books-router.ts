import { createBook, deleteBook, downLoadBook, getBook, getBooks, updateBook } from '../controllers/books-controller';
import { Router } from 'express';
import { BooksRoutes } from './routes';
import bookFileLoader from '../middlewares/book-file-loader';

const { BOOKS, ID, DOWNLOAD } = BooksRoutes;
const fields = [{ name: 'fileBook', maxCount: 1 }, { name: 'fileCover', maxCount: 1 }];

const booksRouter = Router();

booksRouter.get(`${BOOKS}`, getBooks);

booksRouter.get(`${BOOKS}${ID}`, getBook);

booksRouter.post(`${BOOKS}`, bookFileLoader.fields(fields), createBook);

booksRouter.put(`${BOOKS}${ID}`, updateBook);

booksRouter.delete(`${BOOKS}${ID}`, deleteBook);

booksRouter.get(`${BOOKS}${ID}${DOWNLOAD}`, downLoadBook);

export { booksRouter };