import express, { Router } from 'express';
import * as size from '../../controllers/admin/maintenance.controller';

const router: Router = express.Router();

router.post('/create', size.createSizes);

router.get('/all', size.gellAllSizes);

export default router;
