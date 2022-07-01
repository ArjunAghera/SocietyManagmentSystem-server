import express, { Router } from 'express';
import userAdminRoutes from './admin/user.admin.router';
import paymentRoutes from './admin/payment.admin.route';
import residenceSizesRoutes from './admin/residenceSizes.route';
import opinionRoutes from './admin/opinion.admin.router';
import comoplaintRoutes from './admin/complaint.admin.route';
import workerRoutes from './admin/worker.admin.route';

const router: Router = express.Router();

router.use('/user', userAdminRoutes);

router.use('/payment', paymentRoutes);

router.use('/sizes', residenceSizesRoutes);

router.use('/opinion', opinionRoutes);

router.use('/complaint', comoplaintRoutes);

router.use('/worker', workerRoutes);

export default router;
