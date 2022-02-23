import express, { Router } from 'express';
import * as auth from '../controllers/auth.controller';
import passport from '../middlewares/passport.middleware';

const router: Router = express.Router();

router.post('/login', passport.authenticate('local'), auth.postLogin);

router.post('/logout', auth.postLogOut);

export default router;
