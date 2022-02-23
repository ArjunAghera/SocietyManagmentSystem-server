import express, { Router } from 'express';
import userAdminRoutes from './admin/user.admin.router';

const router: Router = express.Router();

router.use('/user', userAdminRoutes);

export default router;
