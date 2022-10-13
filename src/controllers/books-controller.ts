import { libraryDB } from '../db/libraryDB';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { IBook } from 'types/i-book';


const getBooks = (req: Request, res: Response) => {
    res.status(200);
    res.json(libraryDB.books);
};

const getBook = (req: Request, res: Response) => {
    const { id } = req.params;
    const book = libraryDB.books.find((item) => item.id === id);

    if (book) {
        res.status(200);
        res.json(book);
    } else {
        res.status(404);
        res.json('404 | Not Found');
    }

};

const createBook = (req: Request, res: Response) => {
    if (req.body) {
        res.status(201);
        const id = uuid();
        libraryDB.books.push({ ...req.body, id } as IBook);
        const book = libraryDB.books.find((item) => item.id === id);

        if (book) {
            res.status(201);
            res.json(book);
        } else {
            res.status(404);
            res.json('404 | Not Found');
        }
    }
};

const updateBook = (req: Request, res: Response) => {
    const { id } = req.params;
    
    const book = libraryDB.books.findIndex((item) => item.id === id);

    if (book > -1 && req.body) {
        libraryDB.books[book] = { ...libraryDB.books[book], ...req.body };
        res.status(200);
        res.json(libraryDB.books.find((item) => item.id === id));
    } else {
        res.status(404);
        res.json('404 | Not Found');
    }
};

const deleteBook = (req: Request, res: Response) => {
    const { id } = req.params;
    
    const book = libraryDB.books.findIndex((item) => item.id === id);

    if (book > -1 && req.body) {
        libraryDB.books = libraryDB.books.filter((item) => item.id !== id);
        res.status(200);
        res.json('Ок');
    } else {
        res.status(404);
        res.json('404 | Not Found');
    }
};

export { getBooks, getBook, createBook, updateBook, deleteBook };