import { libraryDB } from '../db/libraryDB';
import { Request, Response } from 'express';

export const loginUser =  (req: Request, res: Response) => {
    const { id = '1', email = 'test1@email.com' } = req.body;

    libraryDB.users.push({ id: id, email: email });

    res.status(201);
    res.json(libraryDB.users.find((item) => item.id === id));
};
