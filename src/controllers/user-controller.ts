import { libraryDB } from '../db/libraryDB';
import { Request, Response } from 'express';
import { PAGES_TITLES } from '../utils/constants/pages-titles';

const { SIGNIN_TITLE } = PAGES_TITLES;


export const loginUser = (req: Request, res: Response) => {
    console.log(req.body);
    const { id = new Date, name, email, password  } = req.body;

    libraryDB.users.push({ id: id, email: email });

    res.status(201);
    res.json(libraryDB.users.find((item) => item.id === id));
};

export const viewLoginUser = (req: Request, res: Response) => {
    res.render('pages/login', { title: SIGNIN_TITLE });
};