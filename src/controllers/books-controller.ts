import { libraryDB } from '../db/libraryDB';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import { IBook } from 'types/i-book';
import { TBookFiles } from 'types/t-book-files';
import { publicBooksFilesDir } from '../constants/constants';
import { deleteBookFile } from '../functions/delete-book-file';
import { ViewRoutes } from '../routers/routes';

const { NOT_FOUND_404 } = ViewRoutes;

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
        res.redirect(NOT_FOUND_404);
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
            res.redirect(`/view/${book.id}`);
        } else {
            res.status(404);
            res.redirect(NOT_FOUND_404);
        }
    }
};

const updateBook = (req: Request, res: Response) => {
    const { id } = req.params;
    const book = libraryDB.books.findIndex((item) => item.id === id);

    const files = req.files as TBookFiles;


    if (book > -1 && req.body) {
        let fileBook = libraryDB.books[book].fileBook;
        let fileCover = libraryDB.books[book].fileCover;
        let fileName = libraryDB.books[book].fileName;

        if (files.fileBook) {
            if (fileBook) {
                deleteBookFile(fileBook);
            }

            fileBook = files.fileBook[0].filename;
            fileName = files.fileBook[0].originalname;
        }
        if (files.fileCover) {
            if (fileCover) {
                deleteBookFile(fileCover);
            }
            fileCover = files.fileCover[0].filename;
        }

        libraryDB.books[book] = {
            ...libraryDB.books[book],
            ...req.body,
            fileBook,
            fileName,
            fileCover,
        };

        res.status(200);
        res.redirect(`/view/${id}`);

    } else {
        res.status(404);
        res.redirect(NOT_FOUND_404);
    }
};

const deleteBook = (req: Request, res: Response) => {
    const { id } = req.params;

    const book = libraryDB.books.find((item) => item.id === id);

    if (book && req.body) {
        if (book.fileBook) {
            deleteBookFile(book.fileBook);
        }
        if (book.fileCover) {
            deleteBookFile(book.fileCover);
        }

        libraryDB.books = libraryDB.books.filter((item) => item.id !== id);
        res.status(200);
        res.redirect('/index');
    } else {
        res.status(404);
        res.redirect(NOT_FOUND_404);
    }
};

const downLoadBook = (req: Request, res: Response) => {
    const { id } = req.params;
    const book = libraryDB.books.find(item => item.id === id);
    if (book?.fileBook) {
        res.status(200);
        const file =  `${publicBooksFilesDir}/${book.fileBook}`;
        res.download(file, book.fileName);
    } else {
        res.status(404);
        res.redirect(NOT_FOUND_404);
    }
};

export { getBooks, getBook, createBook, updateBook, deleteBook, downLoadBook };