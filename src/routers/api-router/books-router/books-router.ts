
import { BooksController } from '../../../controllers/books-controller';
import { Router } from 'express';
import { ROUTES } from '../../../utils/constants/routes';

const { BOOKS, ID, DOWNLOAD } = ROUTES;

const booksRouter = Router();

booksRouter.get(BOOKS, BooksController.getBooks);

booksRouter.get(`${BOOKS}${ID}`, BooksController.getBook);

booksRouter.post(BOOKS, BooksController.createBook);

booksRouter.put(`${BOOKS}${ID}`, BooksController.updateBook);

booksRouter.delete(`${BOOKS}${ID}`, BooksController.deleteBook);

booksRouter.get(`${BOOKS}${ID}${DOWNLOAD}`, BooksController.downLoadBook);

export { booksRouter };