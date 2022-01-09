import express from 'express';
const router = express.Router({ mergeParams: true });
import { authUser } from '../controllers/users.js';

router.post('/login', authUser);

export default router;
