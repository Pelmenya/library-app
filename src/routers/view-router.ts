import { Router } from 'express';
import { getIndex, getView, getUpdate, getCreate } from '../controllers/view-controller';
import { ViewRoutes, BooksRoutes } from './routes';

const { BASE_URL, INDEX, VIEW, CREATE, UPDATE } = ViewRoutes;
const { ID } = BooksRoutes;

const viewRouter = Router();

viewRouter.get(BASE_URL, getIndex);

viewRouter.get(INDEX, getIndex);

viewRouter.get(CREATE, getCreate);

viewRouter.get(`${VIEW}${ID}`, getView);

viewRouter.get(`${UPDATE}${ID}`, getUpdate);

export { viewRouter };