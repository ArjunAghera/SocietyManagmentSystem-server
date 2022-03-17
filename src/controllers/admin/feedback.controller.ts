import { RequestHandler } from 'express';
import { throwError } from '../../helpers/ErrorHandler.helper';
import { asyncWrap } from '../../middlewares/async.middleware';
import { Feedback } from '../../models/Feedback.model';

export const getFeedbacks: RequestHandler<any> = asyncWrap(
  async (_req, res) => {
    try {
      const feedback = await Feedback.find({ where: { seen: false } });
      res.status(200).json(feedback);
    } catch (err) {
      throwError(500, err.message);
    }
  },
);

export const putFeedbackSeen: RequestHandler<any> = asyncWrap(
  async (req, res) => {
    try {
      const feedbackId = req.params.id;
      const feedback = await Feedback.update(
        { id: feedbackId },
        { seen: true },
      );
      res.status(200).json(feedback);
    } catch (err) {
      throwError(500, err.message);
    }
  },
);
