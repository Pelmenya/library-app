import { Router } from 'express';
import { getIndex, getView } from '../controllers/view-controller';
import { ViewRoutes, BooksRoutes } from './routes';

const { INDEX, VIEW, CREATE, UPDATE } = ViewRoutes;
const { ID } = BooksRoutes;

const viewRouter = Router();

viewRouter.get(`${INDEX}`, getIndex);

viewRouter.get(`${VIEW}${ID}`, getView);

export { viewRouter };