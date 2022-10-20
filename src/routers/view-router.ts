import { Router } from 'express';
import { getIndex, getView, getUpdate } from '../controllers/view-controller';
import { ViewRoutes, BooksRoutes } from './routes';

const { INDEX, VIEW, CREATE, UPDATE } = ViewRoutes;
const { ID } = BooksRoutes;

const viewRouter = Router();

viewRouter.get(`${INDEX}`, getIndex);

viewRouter.get(`${VIEW}${ID}`, getView);

viewRouter.get(`${UPDATE}${ID}`, getUpdate);

export { viewRouter };