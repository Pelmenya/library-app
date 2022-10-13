import express from 'express';

import { userRouter } from './routers/user-router';
import { booksRouter } from './routers/books-router';

const app = express();

// body-parser
app.use(express.json());

app.use(userRouter);

app.use(booksRouter);

export { app };