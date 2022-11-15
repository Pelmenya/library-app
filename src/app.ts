import express from 'express';
import session from 'express-session';

import { logger } from './middlewares/logger';
import { notFound404 } from './middlewares/not-found-404';

import { viewRouter } from './routers/view-router/view-router';
import { apiRouter } from './routers/api-router/api-router';
import { unionFilesFormDataLoader } from './middlewares/union-files-form-data-loader';
import { methodOverride } from './middlewares/method-override';
import { passport } from './middlewares/passport';

const app = express();

// body-parser
app.use(express.json());
// query-parser
app.use(express.urlencoded({ extended: true }));
// хранилище файлов, заодно парсим data из form-data в req.body
app.use(unionFilesFormDataLoader);
// подменяем метод запроса из html формы, если надо, т.к. при submit только post и get
app.use(methodOverride);

app.use(logger);

app.set('view engine', 'ejs');

app.use(session({ secret: 'SECRET' }));

app.use(passport.initialize());
app.use(passport.session());


app.use('/public', express.static(__dirname + '../..' + '/public'));

app.use(viewRouter);

app.use(apiRouter);

app.use(notFound404);

export { app };