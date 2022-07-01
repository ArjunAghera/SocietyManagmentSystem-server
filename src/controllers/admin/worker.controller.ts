import { RequestHandler } from 'express';
import { throwError } from '../../helpers/ErrorHandler.helper';
import { asyncWrap } from '../../middlewares/async.middleware';
import { User, userRole } from '../../models/User.model';

export const getUnverifiedWorker: RequestHandler<any> = asyncWrap(
  async (_req, res) => {
    try {
      const users = await User.find({
        where: { role: userRole.WORKER, is_verified: false },
      });
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      throwError(500, err.message);
    }
  },
);

export const getVerifiedWorker: RequestHandler<any> = asyncWrap(
  async (_req, res) => {
    try {
      const users = await User.find({
        where: { role: userRole.WORKER, is_verified: true },
      });
      res.status(200).json(users);
    } catch (err) {
      throwError(500, err.message);
    }
  },
);
