import express from 'express';

import { userRouter } from './routers/user-router';
import { booksRouter } from './routers/books-router';
import { logger } from './middlewares/logger';
import { notFound404 } from './middlewares/not-found-404';

const app = express();

// body-parser
app.use(express.json());

app.use(logger);

app.use(userRouter);

app.use(booksRouter);

app.use(notFound404);

export { app };