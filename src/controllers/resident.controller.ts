import { RequestHandler } from 'express';
import { paymentgateway } from '../config/razorpay.config';
import { throwError } from '../helpers/ErrorHandler.helper';
import { asyncWrap } from '../middlewares/async.middleware';
import { Complaint } from '../models/Complaint.model';
import { Feedback } from '../models/Feedback.model';
import { ResidentDetails } from '../models/ResidentDetails.model';
import { User } from '../models/User.model';

export const residentDetails: RequestHandler<any> = asyncWrap(
  async (req, res) => {
    try {
      const user: any = req.user;
      if (user.role === 'resident') {
        const details = await ResidentDetails.createQueryBuilder(
          'resident_details',
        )
          .leftJoinAndSelect('resident_details.user', 'resident')
          .where({ userId: user.id })
          .execute();

        res.status(200).json(details);
      } else {
        res.status(401).json('You are not resident');
      }
    } catch (err) {
      throwError(500, err.message);
    }
  },
);

export const postCreateSubscription: RequestHandler<any> = asyncWrap(
  async (req, res) => {
    try {
      const subscription = await paymentgateway.subscriptions.create({
        plan_id: req.params.plan_id,
        total_count: 1,
      });
      res.status(200).json(subscription);
    } catch (err) {
      throwError(500, err.message);
    }
  },
);

export const postFeedback: RequestHandler<any> = asyncWrap(async (req, res) => {
  try {
    const user: any = req.user;
    if (user.role !== 'resident') {
      throwError(401, 'You are not a resident');
    }
    const feedback = Feedback.create({ feedback: req.body.feedback });
    await feedback.save();
    res.status(200).json(feedback);
  } catch (err) {
    throwError(500, err.message);
  }
});

export const postComplaint: RequestHandler<any> = asyncWrap(
  async (req, res) => {
    try {
      const user: any = req.user;
      const userFound: any = await User.find({ where: { id: user.id } });
      if (user.role !== 'resident') {
        throwError(401, 'You are not a resident');
      }
      const complaint = Complaint.create({
        complaint: req.body.complaint,
        userId: user.id,
        user: userFound,
      });
      await complaint.save();
      res.status(200).json(complaint);
    } catch (err) {
      throwError(500, err.message);
    }
  },
);

export const getComplaints: RequestHandler<any> = asyncWrap(
  async (req, res) => {
    try {
      const user: any = req.user;
      if (user.role === 'resident') {
        const complaints = await Complaint.createQueryBuilder('complaint')
          .leftJoinAndSelect('complaint.user', 'resident')
          .where({ userId: user.id })
          .execute();

        res.status(200).json(complaints);
      } else {
        res.status(401).json('You are not resident');
      }
    } catch (err) {
      throwError(500, err.message);
    }
  },
);
