import express, { Router } from 'express';
import * as user from '../../controllers/admin/user.controller';
import * as residents from '../../controllers/admin/resident.controller';

const router: Router = express.Router();

router.put('/verify/:id', user.verifyUser);

router.delete('/delete/:email', user.deleteUser);

router.get('/residents', residents.getAllVerifiedReidents);

export default router;
