import { Request, Response } from 'express';
import { libraryDB } from '../db/libraryDB';
import { BOOKS_PAGES_TITLES } from '../utils/constants/books-pages-titles';
import { ROUTES } from '../utils/constants/routes';
import { postCountViewBook } from '../utils/functions/post-count-view-book';

const { INDEX_TITLE, VIEW_TITLE, UPDATE_TITLE, CREATE_TITLE } = BOOKS_PAGES_TITLES;
const { NOT_FOUND_404 } = ROUTES;

export const getIndex = (req: Request, res: Response) => {
    res.render(
        'pages/index',
        {
            books: libraryDB.books.filter(item => item.favorite !== 'true'),
            favoriteBooks: libraryDB.books.filter(item => item.favorite === 'true'),
            title: INDEX_TITLE,
        });
};

export const getView = (req: Request, res: Response) => {
    const { id } = req.params;
    const book = libraryDB.books.find(item => item.id === id);

    if (id && book) {
        postCountViewBook(id, (ctn: number) => {
            console.log(ctn);
            res.render('pages/view', { book, title: `${VIEW_TITLE}${book ? book.title : ''}` });
        });
    } else {
        res.status(404);
        res.redirect(NOT_FOUND_404);
    }
};

export const getCreate = (req: Request, res: Response) => {
    res.render('pages/create', { book: false, title: `${CREATE_TITLE}` });
};

export const getUpdate = (req: Request, res: Response) => {
    const { id } = req.params;
    const book = libraryDB.books.find(item => item.id === id);
    if (id && book) {
        res.render('pages/update', { book, title: `${UPDATE_TITLE}${book ? book.title : ''}` });
    } else {
        res.status(404);
        res.redirect(NOT_FOUND_404);
    }
};