import express from 'express';

import { logger } from './middlewares/logger';
import { notFound404 } from './middlewares/not-found-404';

import { userRouter } from './routers/user-router';
import { booksRouter } from './routers/books-router';
import { viewRouter } from './routers/view-router';

const app = express();


// body-parser
app.use(express.json());

app.use(logger);

app.set('view engine', 'ejs');

app.use('/public', express.static(__dirname + '../..' + '/public'));

app.use(viewRouter);

app.use(userRouter);

app.use(booksRouter);

app.use(notFound404);

export { app };