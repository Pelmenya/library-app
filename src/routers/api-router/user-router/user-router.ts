import { loginUser } from '../../../controllers/user-controller';
import { Router } from 'express';
import { ROUTES } from '../../../utils/constants/routes';

const { USER, LOGIN } = ROUTES;


const userRouter = Router();

userRouter.post(`${USER}${LOGIN}`, loginUser);

export { userRouter };

