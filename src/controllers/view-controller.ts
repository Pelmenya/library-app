import { Request, Response } from 'express';
import { libraryDB } from '../db/libraryDB';
import { notFound404Text } from '../constants/constants';

export const getIndex = (req: Request, res: Response) => {
    res.render('pages/index', { libraryDB });
};

export const getView = (req: Request, res: Response) => {
    const { id } = req.params;
    if (id) {
        const book = libraryDB.books.find(item => item.id === id);
        res.render('pages/view', { book });
    } else {
        res.status(404);
        res.json(notFound404Text);
    }
};