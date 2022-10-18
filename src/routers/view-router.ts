import { Router } from 'express';
import { getIndex } from '../controllers/view-controller';
import { ViewRoutes } from './routes';

const { INDEX, VIEW, CREATE, UPDATE } = ViewRoutes;


const viewRouter = Router();

viewRouter.get(`${INDEX}`, getIndex);

export { viewRouter };