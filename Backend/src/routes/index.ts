import { Router } from 'express';
import otpRoutes from './otpRoutes.js';
import authRoutes from './authRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import userRoutes from './userRoutes.js';
import eventRoutes from './eventRoutes.js';

const router = Router();

router.use('/otp', otpRoutes);
router.use('/auth', authRoutes);
router.use('/pay', paymentRoutes);
router.use('/users', userRoutes);
router.use('/events', eventRoutes);

export default router;
