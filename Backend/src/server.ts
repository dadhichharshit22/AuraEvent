// server.ts or index.ts
import app from './app';

const PORT = process.env.PORT || 8085;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Available routes:');
  console.log('- POST /api/otp/send-otp');
  console.log('- POST /api/otp/verify-otp');
});