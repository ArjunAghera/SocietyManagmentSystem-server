import { RequestHandler } from 'express';
import { paymentgateway } from '../../config/razorpay.config';
import { throwError } from '../../helpers/ErrorHandler.helper';
import { asyncWrap } from '../../middlewares/async.middleware';
import { Plan } from '../../models/Plan.model';
import { Size } from '../../models/Size.model';

//this will be used as plan name and also to assign a size to the residents i.e. if resident's assignmed
// size is 5BHK they will only see subscriptions of maintenance fees of 5BHK
export const createSizes: RequestHandler<any> = asyncWrap(async (req, res) => {
  try {
    const newSize = Size.create({ size: req.body.size });
    await newSize.save();
    res.status(200).json(newSize);
  } catch (err) {
    throwError(500, err.message);
  }
});

export const gellAllSizes: RequestHandler<any> = asyncWrap(
  async (_req, res) => {
    try {
      const sizes = await Size.find();
      res.status(200).json(sizes);
    } catch (err) {
      throwError(500, err.message);
    }
  },
);

export const postCreatePlan: RequestHandler<any> = asyncWrap(
  async (req, res) => {
    try {
      const plan = await paymentgateway.plans.create({
        period: req.body.period,
        interval: 1,
        item: {
          name: req.body.planName,
          amount: req.body.amount,
          currency: 'INR',
          description: req.body.planDescription,
        },
      });
      const db_plan = Plan.create({
        plan_id: plan?.id,
        name: plan?.item.name,
        amount: plan?.item.amount,
        description: plan?.item.description,
      });
      await db_plan.save();
      res.status(200).json(db_plan);
    } catch (err) {
      throwError(500, err.message);
    }
  },
);

export const getAllPlans: RequestHandler<any> = asyncWrap(async (_req, res) => {
  try {
    const plans = await Plan.find({});
    res.status(200).json(plans);
  } catch (err) {
    throwError(500, err.message);
  }
});
