import express, { Router } from 'express';
import * as admin from '../../controllers/admin.controller';

const router: Router = express.Router();

router.put('/verify/:email', admin.verifyUser);

router.delete('/delete/:email', admin.deleteUser);

export default router;
