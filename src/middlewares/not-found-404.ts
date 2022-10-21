import { notFound404Text } from '../constants/constants';
import { Request, Response } from 'express';

const notFound404 =  (req: Request, res: Response) => {
    res.status(404);
    res.render('pages/not-found-404', { title: notFound404Text });
};

export { notFound404 };