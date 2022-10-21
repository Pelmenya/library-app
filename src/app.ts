import express from 'express';

import { logger } from './middlewares/logger';
import { notFound404 } from './middlewares/not-found-404';

import { userRouter } from './routers/user-router';
import { booksRouter } from './routers/books-router';
import { viewRouter } from './routers/view-router';
import { unionFilesFormDataLoader } from './middlewares/union-files-form-data-loader';
import { methodOverride } from './middlewares/method-override';


const app = express();
// body-parser
app.use(express.json());
// query-parser
app.use(express.urlencoded({ extended:  true }));
// хранилище файлов, заодно парсим data из form-data в req.body
app.use(unionFilesFormDataLoader);
// подменяем метод запроса из html формы, если надо, т.к. при submit только post и get
app.use(methodOverride);

app.use(logger);

app.set('view engine', 'ejs');

app.use('/public', express.static(__dirname + '../..' + '/public'));

app.use(viewRouter);

app.use(userRouter);

app.use(booksRouter);

app.use(notFound404);

export { app };