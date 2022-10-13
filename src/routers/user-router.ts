import { loginUser } from '../controllers/user-controller';
import { Router } from 'express';
import { User } from './routes';

const { USER, LOGIN } = User;


const userRouter = Router();

userRouter.post(`${USER}${LOGIN}`, loginUser);

export { userRouter };

