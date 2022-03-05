import { RequestHandler } from 'express';
import { throwError } from '../../helpers/ErrorHandler.helper';
import { asyncWrap } from '../../middlewares/async.middleware';
import { Complaint } from '../../models/Complaint.model';

export const getComplaints: RequestHandler<any> = asyncWrap(
  async (_req, res) => {
    try {
      const complaints = await Complaint.createQueryBuilder('complaint')
        .leftJoinAndSelect('complaint.user', 'resident')
        .execute();

      res.status(200).json(complaints);
    } catch (err) {
      throwError(500, err.message);
    }
  },
);
