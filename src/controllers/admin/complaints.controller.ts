import { RequestHandler } from 'express';
import { throwError } from '../../helpers/ErrorHandler.helper';
import { asyncWrap } from '../../middlewares/async.middleware';
import { Complaint } from '../../models/Complaint.model';
import { User } from '../../models/User.model';
import { WorkAssigned, workStatus } from '../../models/WorkAssigned.model';

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

export const assignWork: RequestHandler<any> = asyncWrap(async (req, res) => {
  try {
    const complaintId = req.params.id;
    const userId = req.body.worker;
    console.log(userId);
    const user = await User.findOne({ where: { id: userId } });
    const complaint = await Complaint.findOne({ where: { id: complaintId } });
    if (!user) {
      throwError(400, 'User not found');
    } else {
      const workAssigned = WorkAssigned.create({
        status: workStatus.PENDING,
        userId,
        user: user,
        complaint: complaint,
      });
      await workAssigned.save();
      res.status(200).json(workAssigned);
    }
  } catch (err) {
    throwError(500, err.message);
  }
});
