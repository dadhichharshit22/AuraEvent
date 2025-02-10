export const userRegistrationTemplate = (userName: string) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background-color: #f8f9fa;
      margin: 0;
      padding: 20px;
    }
    .container {
      background: linear-gradient(145deg, #ffffff, #f8f9ff);
      margin: 0 auto;
      padding: 30px;
      max-width: 600px;
      border-radius: 16px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    }
    .header {
      text-align: center;
      margin-bottom: 25px;
    }
    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #4f46e5;
      margin-bottom: 10px;
    }
    .welcome-badge {
      background-color: #4f46e5;
      color: white;
      padding: 8px 20px;
      border-radius: 20px;
      font-size: 14px;
      display: inline-block;
      margin-bottom: 15px;
    }
    .header h1 {
      color: #1f2937;
      font-size: 28px;
      margin: 15px 0;
      font-weight: 600;
    }
    .content {
      padding: 20px;
      background-color: rgba(255, 255, 255, 0.7);
      border-radius: 12px;
      margin: 20px 0;
    }
    .greeting {
      font-size: 18px;
      color: #4f46e5;
      font-weight: 500;
      margin-bottom: 20px;
    }
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      margin: 25px 0;
    }
    .feature-item {
      background-color: white;
      padding: 15px;
      border-radius: 10px;
      box-shadow: 0 2px 15px rgba(0, 0, 0, 0.03);
    }
    .feature-icon {
      font-size: 24px;
      margin-bottom: 10px;
    }
    .feature-title {
      color: #4f46e5;
      font-weight: 500;
      margin-bottom: 5px;
    }
    .feature-desc {
      color: #6b7280;
      font-size: 14px;
    }
    .cta-button {
      display: block;
      background-color: #4f46e5;
      color: white;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 25px;
      text-align: center;
      margin: 25px auto;
      font-weight: 500;
      width: fit-content;
    }
    .social-proof {
      background-color: #f3f4f6;
      padding: 15px;
      border-radius: 10px;
      text-align: center;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      color: #6b7280;
      font-size: 14px;
      border-top: 1px solid #e5e7eb;
    }
    .social-links {
      margin: 15px 0;
    }
    .social-links a {
      color: #4f46e5;
      text-decoration: none;
      margin: 0 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">auraEvent</div>
      <div class="welcome-badge">Welcome to the Community! 🎉</div>
      <h1>Great to have you, ${userName}!</h1>
    </div>
    <div class="content">
      <div class="greeting">
        Your journey to amazing events begins here! ✨
      </div>
      <p>We're excited to have you join auraEvent, where creating memorable experiences becomes effortless. Here's what you can do with your new account:</p>
      
      <div class="feature-grid">
        <div class="feature-item">
          <div class="feature-icon">🎯</div>
          <div class="feature-title">Create Events</div>
          <div class="feature-desc">Design and organize events that leave lasting impressions</div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">📊</div>
          <div class="feature-title">Track Analytics</div>
          <div class="feature-desc">Get insights into your event's performance</div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🤝</div>
          <div class="feature-title">Connect</div>
          <div class="feature-desc">Build your network with like-minded organizers</div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">📱</div>
          <div class="feature-title">Mobile Access</div>
          <div class="feature-desc">Manage events on the go with our mobile app</div>
        </div>
      </div>

      <div class="social-proof">
        "Join thousands of event organizers who create unforgettable experiences with auraEvent"
      </div>

      <a href="#" class="cta-button">Start Creating Events →</a>
    </div>
    
    <div class="footer">
      <div class="social-links">
        <a href="#">Twitter</a>
        <a href="#">Instagram</a>
        <a href="#">Facebook</a>
      </div>
      <p>© ${new Date().getFullYear()} auraEvent. All rights reserved.</p>
      <p>Questions? Contact us at support@auraevent.com</p>
    </div>
  </div>
</body>
</html>
`;
};