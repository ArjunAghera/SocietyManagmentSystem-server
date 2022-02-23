import express, { Router } from 'express';
import * as register from '../controllers/register.controller';

const router: Router = express.Router();

router.post('/resident', register.postCreateResidentUser);

router.post('/worker', register.postCreateWorkerUser);

export default router;
