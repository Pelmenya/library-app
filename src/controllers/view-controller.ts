import { Request, Response } from 'express';
import { libraryDB } from '../db/libraryDB';
import { notFound404Text } from '../constants/constants';
import { BooksPages } from '../constants/books-pages';

const { INDEX, VIEW, UPDATE, CREATE } = BooksPages;

export const getIndex = (req: Request, res: Response) => {
    res.render('pages/index', { libraryDB, title: INDEX });
};

export const getView = (req: Request, res: Response) => {
    const { id } = req.params;
    if (id) {
        const book = libraryDB.books.find(item => item.id === id);
        res.render('pages/view', { book, title: `${VIEW}${book ? book.title : ''}` });
    } else {
        res.status(404);
        res.json(notFound404Text);
    }
};

export const getUpdate = (req: Request, res: Response) => {
    const { id } = req.params;
    if (id) {
        const book = libraryDB.books.find(item => item.id === id);
        res.render('pages/update', { book, title: `${UPDATE}${book ? book.title : ''}` });
    } else {
        res.status(404);
        res.json(notFound404Text);
    }
};