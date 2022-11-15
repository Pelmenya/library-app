import { Request, Response } from 'express';
import { getUser } from '../utils/functions/get-user';
import { Books } from '../models/books';
import { PAGES_TITLES } from '../utils/constants/pages-titles';
import { ROUTES } from '../utils/constants/routes';
import { postCountViewBook } from '../utils/functions/post-count-view-book';

const { INDEX_TITLE, VIEW_TITLE, UPDATE_TITLE, CREATE_TITLE, SIGNIN_TITLE, PROFILE } = PAGES_TITLES;
const { NOT_FOUND_404 } = ROUTES;

export const getIndex = (req: Request, res: Response) => {
    const handler = async () => {
        try {
            const books = await Books.find();
            res.status(200);
            console.log(getUser(req));
            res.render(
                'pages/index',
                {
                    books: books.filter(item => item.favorite !== 'true'),
                    favoriteBooks: books.filter(item => item.favorite === 'true'),
                    title: INDEX_TITLE,
                    user: getUser(req),
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
                    res.render('pages/view', {
                        book,
                        title: `${VIEW_TITLE}${book ? book.title : ''}`,
                        viewCount: ctn,
                        user: getUser(req),
                    });
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
    res.render('pages/create', {
        book: false, title: `${CREATE_TITLE}`, user: getUser(req),
    });
};

export const getUpdate = (req: Request, res: Response) => {
    const handler =
        async () => {
            const { id } = req.params;
            try {
                const book = await Books.findById(id);
                if (id && book) {
                    res.render('pages/update', {
                        book, title: `${UPDATE_TITLE}${book ? book.title : ''}`, user: getUser(req),
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

export const getMe = (req: Request, res: Response) => {
    res.render('pages/profile', { title: PROFILE, user: getUser(req) });
};

export const getLogin = (req: Request, res: Response) => {
    res.render('pages/login', { title: SIGNIN_TITLE, user: getUser(req) });
};

