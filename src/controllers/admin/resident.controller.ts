import { RequestHandler } from 'express';
import { throwError } from '../../helpers/ErrorHandler.helper';
import { asyncWrap } from '../../middlewares/async.middleware';
import { ResidentDetails } from '../../models/ResidentDetails.model';
import { User } from '../../models/User.model';

export const getAllUnverifiedResident: RequestHandler<any> = asyncWrap(
  async (_req, res) => {
    try {
      const users = await User.find({ where: { is_verified: false } });
      res.status(200).json(users);
    } catch (err) {
      throwError(500, err.message);
    }
  },
);

export const getAllVerifiedReidents: RequestHandler<any> = asyncWrap(
  async (_req, res) => {
    try {
      const residents = await ResidentDetails.createQueryBuilder(
        'resident_details',
      )
        .leftJoinAndSelect('resident_details.user', 'resident')
        .execute();

      res.status(200).json(residents);
    } catch (err) {
      throwError(500, err.message);
    }
  },
);
