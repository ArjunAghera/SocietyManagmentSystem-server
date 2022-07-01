import { RequestHandler } from 'express';
import { paymentgateway } from '../config/razorpay.config';
import { throwError } from '../helpers/ErrorHandler.helper';
import { asyncWrap } from '../middlewares/async.middleware';
import { Complaint } from '../models/Complaint.model';
import { Opinion } from '../models/Opinion.model';
import { Plan } from '../models/Plan.model';
import { ResidentDetails } from '../models/ResidentDetails.model';
import { User, userRole } from '../models/User.model';

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
        plan_id: req.params.id,
        total_count: 6,
      });
      res.status(200).json(subscription);
    } catch (err) {
      throwError(500, err.message);
    }
  },
);

// export const postSubscription: RequestHandler<any> = asyncWrap(async (req, res) => {
//   try{
//     const subscription = await paymentgateway.subscriptions.fetch();
//   } catch (err) {
//     throwError(500, err.message);
//   }
// })

export const postOpinion: RequestHandler<any> = asyncWrap(async (req, res) => {
  try {
    const user: any = req.user;
    if (user.role !== 'resident') {
      throwError(401, 'You are not a resident');
    }
    const opinion = Opinion.create({
      opinion: req.body.opinion,
      seen: false,
    });
    await opinion.save();
    res.status(200).json(opinion);
  } catch (err) {
    throwError(500, err.message);
  }
});

export const postComplaint: RequestHandler<any> = asyncWrap(
  async (req, res) => {
    try {
      const user: any = req.user;
      if (!user) throwError(401, 'No user found');
      const userFound: any = await User.findOne({ where: { id: user.id } });
      if (user.role !== 'resident') {
        throwError(401, 'You are not a resident');
      }
      const complaint = Complaint.create({
        complaint: req.body.complaint,
        resolved: false,
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

// export const validateSubscription: RequestHandler<any> = asyncWrap( async (req, res) => {
//   try{

//   } catch (err) {
//     throwError(500, err.message);
//   }
// })

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

//TODO: export const getWorkStatus: RequestHandler<any> = asyncWrap(async (req, res) => {
//   try {
//     const user: any = req.user;
//     if (user.role === 'resident') {
//       const plans = await
//         .execute();

//         res.status(200).json(plans);
//     } else {
//       res.status(401).json('You are not resident');
//     }
//   } catch (err) {
//     throwError(500, err.message);
//   }
// })

export const getResidentMaintenancePlan: RequestHandler<any> = asyncWrap(
  async (req, res) => {
    try {
      const name = req.params.size;
      const user: any = req.user;
      if (user.role === userRole.RESIDENT) {
        const plans = await Plan.find({ where: { name } });
        res.status(200).json(plans);
      } else {
        res.status(401).json('You are not resident');
      }
    } catch (err) {
      throwError(500, err.message);
    }
  },
);

export const verifyPayment: RequestHandler<any> = asyncWrap(
  async (req, _res) => {
    try {
      const razorpaySignature = req.body.razorpay_signature;
      const paymentId = req.body.razorpay_payment_id;
      const razorpaySubscriptionId = req.body.razorpayment_subscription_id;
      const secret: any = process.env.RAZORPAY_SECRET_KEY;

      const verify = await paymentgateway.payments.paymentVerification(
        {
          razorpaySignature,
          paymentId,
          razorpaySubscriptionId,
        },
        secret,
      );
      console.log(verify);
    } catch (err) {
      throwError(500, err.message);
    }
  },
);
