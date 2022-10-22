import { Router } from 'express';
import { getIndex, getView, getUpdate, getCreate } from '../../controllers/view-controller';
import { ROUTES } from '../../utils/constants/routes';

const { ID, INDEX, VIEW, CREATE, UPDATE } = ROUTES;

const viewRouter = Router();

viewRouter.get('/', getIndex);

viewRouter.get(INDEX, getIndex);

viewRouter.get(CREATE, getCreate);

viewRouter.get(`${VIEW}${ID}`, getView);

viewRouter.get(`${UPDATE}${ID}`, getUpdate);

export { viewRouter };