import { RequestHandler } from 'express';
import { throwError } from '../helpers/ErrorHandler.helper';
import { asyncWrap } from '../middlewares/async.middleware';
import { User } from '../models/User.model';

export const verifyUser: RequestHandler<any> = asyncWrap(async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.update({ email }, { is_verified: true });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    throwError(500, err.message);
  }
});

export const deleteUser: RequestHandler<any> = asyncWrap(async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.delete({ email: email });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    throwError(500, err.message);
  }
});
