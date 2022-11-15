import { getLogin } from '../../../controllers/view-controller';
import { signUpUser } from '../../../controllers/user-controller';
import { Router } from 'express';
import { ROUTES } from '../../../utils/constants/routes';
import { passportAuthenticate } from '../../../middlewares/passport-authenticate';

const { USER, LOGIN, SIGNUP } = ROUTES;

const userRouter = Router();

userRouter.get(`${USER}${LOGIN}`, getLogin);

userRouter.post(`${USER}${LOGIN}`, passportAuthenticate, (req, res) => {
    res.redirect('/');
});

userRouter.post(`${USER}${SIGNUP}`, signUpUser, passportAuthenticate, (req, res) => {
    res.redirect('/');
});

export { userRouter };

