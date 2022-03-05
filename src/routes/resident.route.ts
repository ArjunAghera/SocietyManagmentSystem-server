import express, { Router } from 'express';
import * as res from '../controllers/resident.controller';

const router: Router = express.Router();

router.get('/my-info', res.residentDetails);

router.post('/feedback', res.postFeedback);

router.post('/complaint', res.postComplaint);

router.get('/complaint', res.getComplaints);

export default router;
