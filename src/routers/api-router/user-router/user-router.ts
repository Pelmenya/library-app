import { getLogin, getMe } from '../../../controllers/view-controller';
import { logoutUser, signUpUser } from '../../../controllers/user-controller';
import { Router } from 'express';
import { ROUTES } from '../../../utils/constants/routes';
import { passportAuthenticate } from '../../../middlewares/passport-authenticate';
import { isAuthenticated } from '../../../middlewares/is-authenticate';

const { USER, LOGIN, SIGNUP, ME, LOGOUT } = ROUTES;

const userRouter = Router();

userRouter.get(`${USER}${LOGIN}`, getLogin);

userRouter.get(`${USER}${ME}`, isAuthenticated, getMe);

userRouter.post(`${USER}${LOGOUT}`, isAuthenticated, logoutUser);

userRouter.post(`${USER}${LOGIN}`, passportAuthenticate, (req, res) => {
    res.redirect('/');
});

userRouter.post(`${USER}${SIGNUP}`, signUpUser, passportAuthenticate, (req, res) => {
    res.redirect('/');
});

export { userRouter };

