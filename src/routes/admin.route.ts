import express, { Router } from 'express';
import userAdminRoutes from './admin/user.admin.router';
import paymentRoutes from './admin/payment.admin.route';
import residenceSizesRoutes from './admin/residenceSizes.route';

const router: Router = express.Router();

router.use('/user', userAdminRoutes);

router.use('/payment', paymentRoutes);

router.use('/sizes', residenceSizesRoutes);

export default router;
