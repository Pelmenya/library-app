import { loginUser } from '../controllers/user-controller';
import { Router } from 'express';
import { UserRoutes } from './routes';

const { USER, LOGIN } = UserRoutes;


const userRouter = Router();

userRouter.post(`${USER}${LOGIN}`, loginUser);

export { userRouter };

