import { Request, Response } from 'express';
import { Books } from '../models/books';
import { libraryDB } from '../db/libraryDB';
import { BOOKS_PAGES_TITLES } from '../utils/constants/books-pages-titles';
import { ROUTES } from '../utils/constants/routes';
import { postCountViewBook } from '../utils/functions/post-count-view-book';

const { INDEX_TITLE, VIEW_TITLE, UPDATE_TITLE, CREATE_TITLE } = BOOKS_PAGES_TITLES;
const { NOT_FOUND_404 } = ROUTES;

export const getIndex = (req: Request, res: Response) => {
    const handler = async () => {
        try {
            const books = await Books.find();
            res.status(200);
            res.render(
                'pages/index',
                {
                    books: books.filter(item => item.favorite !== 'true'),
                    favoriteBooks: books.filter(item => item.favorite === 'true'),
                    title: INDEX_TITLE,
                });
        } catch (e) {
            res.status(500).json(e);
        }
    };
    handler().catch(e => console.log(e));
};

export const getView = (req: Request, res: Response) => {
    const handler = async () => {
        const { id } = req.params;
        try {
            const book = await Books.findById(id);

            if (id && book) {
                postCountViewBook(id, (ctn: number) => {
                    res.render('pages/view', { book, title: `${VIEW_TITLE}${book ? book.title : ''}`, viewCount: ctn });
                });
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

export const getCreate = (req: Request, res: Response) => {
    res.render('pages/create', { book: false, title: `${CREATE_TITLE}` });
};

export const getUpdate = (req: Request, res: Response) => {
    const handler =
        async () => {
            const { id } = req.params;
            try {
                const book = await Books.findById(id);
                if (id && book) {
                    res.render('pages/update', { book, title: `${UPDATE_TITLE}${book ? book.title : ''}` });
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