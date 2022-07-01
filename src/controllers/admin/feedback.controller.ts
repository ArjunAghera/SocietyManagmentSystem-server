import { RequestHandler } from 'express';
import { throwError } from '../../helpers/ErrorHandler.helper';
import { asyncWrap } from '../../middlewares/async.middleware';
import { Opinion } from '../../models/Opinion.model';

export const getFeedbacks: RequestHandler<any> = asyncWrap(
  async (_req, res) => {
    try {
      const feedback = await Opinion.find({ where: { seen: false } });
      res.status(200).json(feedback);
    } catch (err) {
      throwError(500, err.message);
    }
  },
);

export const putFeedbackSeen: RequestHandler<any> = asyncWrap(
  async (req, res) => {
    try {
      const opinionId = req.params.id;
      const opinion = await Opinion.update({ id: opinionId }, { seen: true });
      res.status(200).json(opinion);
    } catch (err) {
      throwError(500, err.message);
    }
  },
);
