import { Router } from 'express';
import { ROUTES } from '../../utils/constants/routes';
import { booksRouter } from './books-router/books-router';
import { userRouter } from './user-router/user-router';

const { API } = ROUTES;


const apiRouter = Router();

apiRouter.use(API, userRouter, booksRouter);

export { apiRouter };