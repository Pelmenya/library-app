
import { BooksController } from '../../../controllers/books-controller';
import { Router } from 'express';
import { ROUTES } from '../../../utils/constants/routes';
import { containerIoC } from '../../../container-i-o-c/container-i-o-c';

const { BOOKS, ID, DOWNLOAD } = ROUTES;

const booksRouter = Router();

const booksController = containerIoC.get(BooksController);

booksRouter.get(BOOKS, booksController.getBooks);

booksRouter.get(`${BOOKS}${ID}`, booksController.getBook);

booksRouter.post(BOOKS, booksController.createBook);

booksRouter.put(`${BOOKS}${ID}`, booksController.updateBook);

booksRouter.delete(`${BOOKS}${ID}`, booksController.deleteBook);

booksRouter.get(`${BOOKS}${ID}${DOWNLOAD}`, booksController.downLoadBook);

export { booksRouter };