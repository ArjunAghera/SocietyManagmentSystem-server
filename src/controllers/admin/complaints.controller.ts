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

export const putComplaintResolved: RequestHandler<any> = asyncWrap(
  async (req, res) => {
    try {
      const feedbackId = req.params.id;
      const feedback = await Complaint.update(
        { id: feedbackId },
        { resolved: true },
      );
      res.status(200).json(feedback);
    } catch (err) {
      throwError(500, err.message);
    }
  },
);
