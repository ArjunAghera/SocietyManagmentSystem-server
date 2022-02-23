import express from 'express';
import cookieParser from 'cookie-parser';

import sessionMiddleware from '../middlewares/session.middleware';
import passport from '../middlewares/passport.middleware';
import { isAdmin, isAuthenticated } from '../middlewares/auth.middleware';
import authRoutes from '../routes/auth.route';
import registerRoutes from '../routes/register.route';
import adminRoutes from '../routes/admin.route';
import { throwError } from '../helpers/ErrorHandler.helper';

const api = express();
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(sessionMiddleware);
api.use(cookieParser());
api.use(passport.initialize());
api.use(passport.session());

api.use('/auth', authRoutes);
api.use('/register', registerRoutes);
api.use('/admin', adminRoutes, isAuthenticated, isAdmin);
api.use('/', () => {
  throwError(404, 'Route does not exist');
});

export default api;
