import { RequestHandler } from 'express';
import { hash } from 'bcrypt';
import { User, userRole } from '../models/User.model';
import { asyncWrap } from '../middlewares/async.middleware';
import { throwError } from '../helpers/ErrorHandler.helper';

const createResident = async (data) => {
  const { name, email, password } = data;

  //validating if all the inputs are filled
  if (!name || !email || !password)
    throwError(400, 'Fill all the required fields');

  const hashedPassword = await hash(password, 10);
  const is_admin = false;
  const role = userRole.RESIDENT;
  return User.create({
    name,
    email,
    password: hashedPassword,
    is_admin,
    role,
    is_verified: false,
  });
};

const createWorker = async (data) => {
  const { name, email, password } = data;

  //validating if all the inputs are filled
  if (!name || !email || !password)
    throwError(400, 'Fill all the required fields');

  const hashedPassword = await hash(password, 10);
  const is_admin = false;
  const role = userRole.WORKER;
  const is_verified = false;
  return User.create({
    name,
    email,
    password: hashedPassword,
    is_admin: is_admin,
    role: role,
    is_verified: is_verified,
  });
};

export const postCreateResidentUser: RequestHandler<any> = asyncWrap(
  async (req, res) => {
    try {
      const user = await createResident(req.body);
      await user.save();
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      throwError(400, err.message);
    }
  },
);

export const postCreateWorkerUser: RequestHandler<any> = asyncWrap(
  async (req, res) => {
    try {
      const user = await createWorker(req.body);
      await user.save();
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      throwError(400, err.message);
    }
  },
);
