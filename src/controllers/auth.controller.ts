import { RequestHandler } from 'express';
import { throwError } from '../helpers/ErrorHandler.helper';
import { asyncWrap } from '../middlewares/async.middleware';

export const postLogin: RequestHandler<any> = asyncWrap(
  async (req, res, _next) => {
    try {
      const user: any = req.user;
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.is_admin,
        isVerified: user.is_verified,
      });
    } catch (err) {
      console.error(err);
      throwError(500, err.message);
    }
  },
);

export const postLogOut: RequestHandler<any> = asyncWrap(
  async (req, res, _next) => {
    try {
      req.logOut();
      res.status(200).json('Logged out successfully.');
    } catch (err) {
      throwError(500, err.message);
    }
  },
);
