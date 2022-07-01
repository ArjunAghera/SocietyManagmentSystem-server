import express, { Router } from 'express';
import * as complaint from '../../controllers/admin/complaints.controller';

const router: Router = express.Router();

router.get('/all', complaint.getComplaints);

router.put('/resolved/:id', complaint.putComplaintResolved);

router.post('/assign-work/:id', complaint.assignWork);

export default router;
