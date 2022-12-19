import 'reflect-metadata';
import { injectable } from 'inversify';
import { v4 as uuid } from 'uuid';

import { Request, Response } from 'express';
import { UpdateQuery } from 'mongoose';
import { TBookFiles } from 'types/t-book-files';
import { publicBooksFilesDir } from '../utils/constants/constants';
import { deleteBookFile } from '../utils/functions/delete-book-file';
import { ROUTES } from '../utils/constants/routes';
import { Books } from '../models/books';

const { NOT_FOUND_404 } = ROUTES;
@injectable()
export class BooksController {

    getBooks = (req: Request, res: Response) => {
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

    getBook = (req: Request, res: Response) => {
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

    createBook = (req: Request, res: Response) => {
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

                const newBook = new Books({ id: uuid(), ...req.body, fileCover, fileName, fileBook });
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

    updateBook = (req: Request, res: Response) => {
        const handler = async () => {
            const { id } = req.params;
            try {
                const book = await Books.findById(id);
                const files = req.files as TBookFiles;

                if (book && req.body) {
                    let fileBook = book.fileBook;
                    let fileCover = book.fileCover;
                    let fileName = book.fileName;

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

                    const newBook: UpdateQuery<{
                        title: string;
                        description: string;
                        authors: string;
                        favorite: string;
                        fileCover: string;
                        fileName: string;
                        fileBook: string;
                    }> | undefined = {
                        ...req.body,
                        fileBook,
                        fileName,
                        fileCover,
                    };

                    try {
                        const upBook = await Books.findByIdAndUpdate({ _id: id }, newBook);
                        res.status(200);
                        res.redirect(`/view/${String(upBook?._id)}`);
                    } catch (e) {
                        res.status(500).json(e);
                    }
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

    deleteBook = (req: Request, res: Response) => {
        const handler = async () => {
            const { id } = req.params;
            try {
                const book = await Books.findByIdAndRemove(id);
                if (book && req.body) {
                    if (book.fileBook) {
                        deleteBookFile(book.fileBook);
                    }
                    if (book.fileCover) {
                        deleteBookFile(book.fileCover);
                    }

                    res.status(200);
                    res.redirect('/index');
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

    downLoadBook = (req: Request, res: Response) => {
        const handler = async () => {
            const { id } = req.params;
            try {
                const book = await Books.findById(id);

                if (book?.fileBook) {
                    res.status(200);
                    const file = `${publicBooksFilesDir}/${book.fileBook}`;
                    res.download(file, book.fileName);
                } else {
                    res.status(404);
                    res.redirect(NOT_FOUND_404);
                }
            } catch (e) {
                res.status(500).json(e);
            }
        };

        handler().catch((e) => console.log(e));
    };

}
