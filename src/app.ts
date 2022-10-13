import express, { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import { ILibrary } from 'types/i-library';
import { IBook } from 'types/i-book';

export const app = express();


const libraryDB: ILibrary = {
    books: [
        {
            id: '1',
            title: 'Flowers',
            authors: 'dd',
            favorite: 'dad',
            description: 'dasd asda sdasd',
        },
        {
            id: '2',
            title: 'Flowers',
            authors: 'dd',
            favorite: 'dad',
            description: 'dasd asda sdasd',
            fileCover: 'dd adczxv fgh asd wer',
            fileName: 'wic.txt',
        }],
    users: [],
};
// body-parser
app.use(express.json());

app.post('/api/user/login', (req: Request, res: Response) => {
    const { id = '1', email = 'test1@email.com' } = req.body;

    libraryDB.users.push({ id: id, email: email });

    res.status(201);
    res.json(libraryDB.users.find((item) => item.id === id));
});

app.get('/api/books', (req: Request, res: Response) => {
    res.status(200);
    res.json(libraryDB.books);
});

app.get('/api/books/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const book = libraryDB.books.find((item) => item.id === id);

    if (book) {
        res.status(200);
        res.json(book);
    } else {
        res.status(404);
        res.send('Not Found');
    }

});

app.post('/api/books', (req: Request, res: Response) => {
    if (req.body) {
        res.status(201);
        const id = uuid();
        libraryDB.books.push({ id, ...req.body } as IBook);
        const book = libraryDB.books.find((item) => item.id === id);

        if (book) {
            res.status(201);
            res.json(book);
        } else {
            res.status(404);
            res.send('Not Found');
        }
    }
});

app.put('/api/books/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    
    const book = libraryDB.books.findIndex((item) => item.id === id);

    if (book > -1 && req.body) {
        libraryDB.books[book] = { ...libraryDB.books[book], ...req.body };
        res.status(200);
        res.json(libraryDB.books.find((item) => item.id === id));
    } else {
        res.status(404);
        res.send('Not Found');
    }
});

app.delete('/api/books/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    
    const book = libraryDB.books.findIndex((item) => item.id === id);

    if (book > -1 && req.body) {
        libraryDB.books = libraryDB.books.filter((item) => item.id !== id);
        res.status(200);
        res.send('Ок');
    } else {
        res.status(404);
        res.send('Not Found');
    }
});
