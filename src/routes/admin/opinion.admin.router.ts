import express, { Router } from 'express';
import * as feedback from '../../controllers/admin/feedback.controller';

const router: Router = express.Router();

router.get('/all', feedback.getFeedbacks);

router.put('/seen/:id', feedback.putFeedbackSeen);

export default router;
