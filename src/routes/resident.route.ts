import express, { Router } from 'express';
import * as res from '../controllers/resident.controller';

const router: Router = express.Router();

router.get('/my-info', res.residentDetails);

router.post('/opinion', res.postOpinion);

router.post('/complaint', res.postComplaint);

router.get('/complaint', res.getComplaints);

router.post('/subscription/:id', res.postCreateSubscription);

router.get('/maintenance-plan/:size', res.getResidentMaintenancePlan);

router.post('/verify-payment', res.verifyPayment);

export default router;
