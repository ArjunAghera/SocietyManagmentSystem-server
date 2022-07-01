import express, { Router } from 'express';
import * as worker from '../controllers/worker.contoller';

const router: Router = express.Router();

router.get('/work-assigned', worker.getWorkAssigned);

router.put('/work-assigned/:id', worker.putWorkAssigned);

router.delete('/work-assigned/:id', worker.deleteWorkAssignedDone);

router.get('/work-inprogress', worker.getWorkInprogress);

router.put('/work-inprogress/:id', worker.putWorkInprogressToCompletion);

router.get('/work-done', worker.getWorkDone);

export default router;
