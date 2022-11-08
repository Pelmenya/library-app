import { libraryDB } from '../db/libraryDB';
import { Request, Response } from 'express';
import { TBookFiles } from 'types/t-book-files';
import { publicBooksFilesDir } from '../utils/constants/constants';
import { deleteBookFile } from '../utils/functions/delete-book-file';
import { ROUTES } from '../utils/constants/routes';
import { Books } from '../models/books';

const { NOT_FOUND_404 } = ROUTES;

const getBooks = (req: Request, res: Response) => {
    const handler = async () => {
        try {
            const books = await Books.find();
            res.status(200);
            res.json(books);
        } catch (e) {
            res.status(500).json(e);
        }
    };
    handler().catch(e => console.log(e));
};

const getBook = (req: Request, res: Response) => {
    const handler = async () => {
        const { id } = req.params;
        try {
            const book = await Books.findById(id);
            if (id && book) {
                res.status(200);
                res.json(book);
            } else {
                res.status(404);
                res.redirect(NOT_FOUND_404);
            }
        } catch (e) {
            res.status(500).json(e);
        }
    };
    handler().catch(e => console.log(e));
};

const createBook = (req: Request, res: Response) => {
    const handler = async () => {
        if (req.body && req.files) {
            const files = req.files as TBookFiles;
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

            const newBook = new Books({ ...req.body, fileCover, fileName, fileBook });
            try {
                if (newBook) {
                    await newBook.save();
                    res.status(201);
                    res.redirect(`/view/${String(newBook._id)}`);
                } else {
                    res.status(404);
                    res.redirect(NOT_FOUND_404);
                }
            } catch (e) {
                res.status(500).json(e);
            }
        }
    };
    handler().catch(e => console.log(e));
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
        const file = `${publicBooksFilesDir}/${book.fileBook}`;
        res.download(file, book.fileName);
    } else {
        res.status(404);
        res.redirect(NOT_FOUND_404);
    }
};

export { getBooks, getBook, createBook, updateBook, deleteBook, downLoadBook };