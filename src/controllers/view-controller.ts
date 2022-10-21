import { Request, Response } from 'express';
import { libraryDB } from '../db/libraryDB';
import { BooksPages } from '../constants/books-pages';
import { ViewRoutes } from '../routers/routes';

const { INDEX, VIEW, UPDATE, CREATE } = BooksPages;
const { NOT_FOUND_404 } = ViewRoutes;

export const getIndex = (req: Request, res: Response) => {
    res.render(
        'pages/index', 
        { 
            books: libraryDB.books.filter(item => item.favorite !== 'true'), 
            favoriteBooks: libraryDB.books.filter(item => item.favorite === 'true'), 
            title: INDEX,
        });
};

export const getView = (req: Request, res: Response) => {
    const { id } = req.params;
    const book = libraryDB.books.find(item => item.id === id);

    if (id && book) {        
        res.render('pages/view', { book, title: `${VIEW}${book ? book.title : ''}` });
    } else {
        res.status(404);
        res.redirect(NOT_FOUND_404);
    }
};

export const getCreate = (req: Request, res: Response) => {
    res.render('pages/create', { book: false, title: `${CREATE}` });
};

export const getUpdate = (req: Request, res: Response) => {
    const { id } = req.params;
    const book = libraryDB.books.find(item => item.id === id);
    if (id && book) {
        res.render('pages/update', { book, title: `${UPDATE}${book ? book.title : ''}` });
    } else {
        res.status(404);
        res.redirect(NOT_FOUND_404);
    }
};