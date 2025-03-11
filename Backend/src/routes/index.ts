import { Router } from 'express';
import otpRoutes from './otpRoutes';
import authRoutes from './authRoutes';
import paymentRoutes from './paymentRoutes';
import userRoutes from './userRoutes';
import eventRoutes from './eventRoutes';

const router = Router();

router.use('/otp', otpRoutes);
router.use('/auth', authRoutes);
router.use('/pay', paymentRoutes);
router.use('/users', userRoutes);
router.use('/events', eventRoutes);

export default router;
