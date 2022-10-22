import {
    createBook,
    deleteBook,
    downLoadBook,
    getBook,
    getBooks,
    updateBook,
} from '../../../controllers/books-controller';

import { Router } from 'express';
import { ROUTES } from '../../../utils/constants/routes';

const { BOOKS, ID, DOWNLOAD } = ROUTES;

const booksRouter = Router();

booksRouter.get(BOOKS, getBooks);

booksRouter.get(`${BOOKS}${ID}`, getBook);

booksRouter.post(BOOKS, createBook);

booksRouter.put(`${BOOKS}${ID}`, updateBook);

booksRouter.delete(`${BOOKS}${ID}`, deleteBook);

booksRouter.get(`${BOOKS}${ID}${DOWNLOAD}`, downLoadBook);

export { booksRouter };