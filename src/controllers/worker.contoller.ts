import { RequestHandler } from 'express';
import { asyncWrap } from '../middlewares/async.middleware';
import { throwError } from '../helpers/ErrorHandler.helper';
import { WorkAssigned, workStatus } from '../models/WorkAssigned.model';

export const getWorkAssigned: RequestHandler<any> = asyncWrap(
  async (req, res) => {
    try {
      const user: any = req.user;
      if (user.role === 'worker') {
        const workAssigned = await WorkAssigned.createQueryBuilder(
          'work_assigned',
        )
          .leftJoinAndSelect('work_assigned.user', 'worker')
          .leftJoinAndSelect('work_assigned.complaint', 'complaint')
          .where({ userId: user.id, status: workStatus.PENDING })
          .execute();
        res.status(200).json(workAssigned);
      } else {
        res.status(401).json('You are not worker');
      }
    } catch (err) {
      throwError(500, err.message);
    }
  },
);

export const putWorkAssigned: RequestHandler<any> = asyncWrap(
  async (req, res) => {
    try {
      const user: any = req.user;
      if (user.role === 'worker') {
        const workAssignedId = req.params.id;
        const workAssigned = await WorkAssigned.update(
          { id: workAssignedId },
          { status: workStatus.INPROGRESS },
        );
        res.status(200).json(workAssigned);
      } else {
        res.status(401).json('You are not worker');
      }
    } catch (err) {
      throwError(500, err.message);
    }
  },
);

export const deleteWorkAssignedDone: RequestHandler<any> = asyncWrap(
  async (req, res) => {
    try {
      const user: any = req.user;
      if (user.role === 'worker') {
        const workAssignedId = req.params.id;
        const workAssigned = await WorkAssigned.delete({ id: workAssignedId });
        res.status(200).json(workAssigned);
      } else {
        res.status(401).json('You are not worker');
      }
    } catch (err) {
      throwError(500, err.message);
    }
  },
);

export const getWorkInprogress: RequestHandler<any> = asyncWrap(
  async (req, res) => {
    try {
      const user: any = req.user;
      if (user.role === 'worker') {
        const workAssigned = await WorkAssigned.createQueryBuilder(
          'work_assigned',
        )
          .leftJoinAndSelect('work_assigned.user', 'worker')
          .leftJoinAndSelect('work_assigned.complaint', 'complaint')
          .where({ userId: user.id, status: workStatus.INPROGRESS })
          .execute();
        res.status(200).json(workAssigned);
      } else {
        res.status(401).json('You are not worker');
      }
    } catch (err) {
      throwError(500, err.message);
    }
  },
);

export const putWorkInprogressToCompletion: RequestHandler<any> = asyncWrap(
  async (req, res) => {
    try {
      const user: any = req.user;
      if (user.role === 'worker') {
        const workAssignedId = req.params.id;
        const workCompleted = await WorkAssigned.update(
          { id: workAssignedId },
          { status: workStatus.COMPLETED },
        );
        res.status(200).json(workCompleted);
      } else {
        res.status(401).json('You are not worker');
      }
    } catch (err) {
      throwError(500, err.message);
    }
  },
);

export const getWorkDone: RequestHandler<any> = asyncWrap(async (req, res) => {
  try {
    const user: any = req.user;
    if (user.role === 'worker') {
      const workAssigned = await WorkAssigned.createQueryBuilder(
        'work_assigned',
      )
        .leftJoinAndSelect('work_assigned.user', 'worker')
        .leftJoinAndSelect('work_assigned.complaint', 'complaint')
        .where({ userId: user.id, status: workStatus.COMPLETED })
        .execute();
      res.status(200).json(workAssigned);
    } else {
      res.status(401).json('You are not worker');
    }
  } catch (err) {
    throwError(500, err.message);
  }
});
