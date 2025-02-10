// app.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import paymentRoutes from './routes/paymentRoutes';
import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';
import otpRoutes from './routes/otpRoutes';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Use express.json() instead of bodyParser
app.use(express.urlencoded({ extended: true }));

// Enhanced logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Body:', req.body);
  next();
});

// Routes
app.use('/api/otp', otpRoutes);  // Move OTP routes to top
app.use('/api/auth', authRoutes);
app.use('/api/pay', paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.url} not found` });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

export default app;