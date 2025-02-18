
import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import paymentRoutes from './routes/paymentRoutes';
import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';
import otpRoutes from './routes/otpRoutes';

const app = express();

connectDB();


app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Body:', req.body);
  next();
});

const PORT = process.env.PORT || 8085;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Routes
app.use('/api/otp', otpRoutes);  
app.use('/api/auth', authRoutes);
app.use('/api/pay', paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);


export default app;