import express, { Router } from 'express';
import * as plan from '../../controllers/admin/maintenance.controller';

const router: Router = express.Router();

router.post('/create-plan', plan.postCreatePlan);

router.get('/all-plans', plan.getAllPlans);

export default router;
