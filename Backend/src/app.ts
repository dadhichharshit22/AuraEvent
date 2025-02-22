
import express from 'express';
import cors from 'cors';
import connectDB from './config/databaseConnection';
import authRoutes from './routes/authRoutes';
import paymentRoutes from './routes/paymentRoutes';
import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';
import otpRoutes from './routes/otpRoutes';
import corsMiddleware from './middlewares/corsMiddleware';
const app = express();

connectDB();


app.use(corsMiddleware); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Body:', req.body);
  next();
});


app.use('/api/otp', otpRoutes);  
app.use('/api/auth', authRoutes);
app.use('/api/pay', paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);


export default app;