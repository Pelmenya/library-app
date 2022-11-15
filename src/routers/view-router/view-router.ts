import { Router } from 'express';
import { isAuthenticated } from '../../middlewares/is-authenticate';
import { getIndex, getView, getUpdate, getCreate } from '../../controllers/view-controller';
import { ROUTES } from '../../utils/constants/routes';

const { ID, INDEX, VIEW, CREATE, UPDATE } = ROUTES;

const viewRouter = Router();

viewRouter.get('/', isAuthenticated, getIndex);

viewRouter.get(INDEX,  isAuthenticated, getIndex);

viewRouter.get(CREATE, isAuthenticated, getCreate);

viewRouter.get(`${VIEW}${ID}`, isAuthenticated, getView);

viewRouter.get(`${UPDATE}${ID}`, isAuthenticated, getUpdate);

export { viewRouter };