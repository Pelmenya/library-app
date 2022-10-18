import { libraryDB } from '../db/libraryDB';
import { Request, Response } from 'express';

export const getIndex =  (req: Request, res: Response) => {
    res.render('index', { libraryDB });    
};
