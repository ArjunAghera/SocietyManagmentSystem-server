import express, { Router } from 'express';
import * as worker from '../../controllers/admin/worker.controller';

const router: Router = express.Router();

router.get('/unverified', worker.getUnverifiedWorker);

router.get('/verified', worker.getVerifiedWorker);

export default router;
