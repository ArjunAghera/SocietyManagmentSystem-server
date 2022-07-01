import { RequestHandler } from 'express';
import { throwError } from '../../helpers/ErrorHandler.helper';
import { asyncWrap } from '../../middlewares/async.middleware';
import { User } from '../../models/User.model';
import { ResidentDetails } from '../../models/ResidentDetails.model';

export const verifyUser: RequestHandler<any> = asyncWrap(async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ where: { id } });
    if (user?.role === 'resident') {
      const residentDetails = ResidentDetails.create({
        block_no: req.body.blockNo,
        size: req.body.size,
        userId: id,
        user: user,
      });
      await residentDetails.save();
      const updateUser = await User.update({ id }, { is_verified: true });
      res.status(200).json({ updateUser, residentDetails });
    } else {
      const updateUser = await User.update({ id }, { is_verified: true });
      res.status(200).json({ updateUser });
    }
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
