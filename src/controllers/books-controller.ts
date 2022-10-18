import { libraryDB } from '../db/libraryDB';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import path from 'path';

import { IBook } from 'types/i-book';
import { TBookFiles } from 'types/t-book-files';
import { notFound404Text, publicBooksFilesDir } from '../constants/constants';

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
        res.json(notFound404Text);
    }

};

const createBook = (req: Request, res: Response) => {
    if (req.body && req.files) {
        const files = req.files as TBookFiles;
        const id = uuid();
        let fileBook = '';
        let fileCover = '';
        let fileName = '';
        if (files.fileBook) {
            fileBook = files.fileBook[0].filename;
            fileName = files.fileBook[0].originalname;
        }
        if (files.fileCover) {
            fileCover = files.fileCover[0].filename;
        }
        libraryDB.books.push({ id, ...req.body, fileCover, fileName, fileBook } as IBook);
        const book = libraryDB.books.find((item) => item.id === id);

        if (book) {
            res.status(201);
            res.json(book);
        } else {
            res.status(404);
            res.json(notFound404Text);
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
        res.json(notFound404Text);
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
        res.json(notFound404Text);
    }
};

const downLoadBook = (req: Request, res: Response) => {
    const { id } = req.params;
    const book = libraryDB.books.find(item => item.id === id);
    if (book?.fileBook) {
        res.status(200);
        const file = path.join(__dirname, '../..', `${publicBooksFilesDir}/${book.fileBook}`);
        res.download(file, book.fileName);
    } else {
        res.status(404);
        res.json(notFound404Text);
    }
};

export { getBooks, getBook, createBook, updateBook, deleteBook, downLoadBook };