import { RequestHandler } from 'express';
import { throwError } from '../../helpers/ErrorHandler.helper';
import { asyncWrap } from '../../middlewares/async.middleware';
import { ResidentDetails } from '../../models/ResidentDetails.model';

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
