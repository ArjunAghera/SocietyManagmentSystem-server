import express, { Router } from 'express';
import * as complaint from '../../controllers/admin/complaints.controller';

const router: Router = express.Router();

router.get('/all', complaint.getComplaints);

router.put('/resolved/:id', complaint.putComplaintResolved);

export default router;
