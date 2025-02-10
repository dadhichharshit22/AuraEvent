
export const newEventNotification = (eventTitle: string, eventDate: string, eventDescription: string) => `
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
    .event-card {
      border-left: 4px solid #4f46e5;
      padding: 15px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 15px rgba(0, 0, 0, 0.03);
    }
    .event-title {
      color: #4f46e5;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 15px;
    }
    .event-detail {
      margin: 10px 0;
      color: #4b5563;
      line-height: 1.6;
    }
    .event-date {
      display: inline-block;
      background-color: #f3f4f6;
      padding: 8px 15px;
      border-radius: 20px;
      color: #4f46e5;
      font-weight: 500;
      margin: 10px 0;
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
      <h1>✨ New Event Alert!</h1>
    </div>
    <div class="content">
      <div class="event-card">
        <div class="event-title">${eventTitle}</div>
        <div class="event-date">📅 ${new Date(eventDate).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</div>
        <div class="event-detail">${eventDescription}</div>
      </div>
    </div>
    <a href="#" class="cta-button">View Event Details</a>
    <div class="footer">
      <div class="social-links">
        <a href="#">Twitter</a>
        <a href="#">Instagram</a>
        <a href="#">Facebook</a>
      </div>
      <p>© ${new Date().getFullYear()} auraEvent. All rights reserved.</p>
      <p>You received this email because you're subscribed to event notifications.</p>
    </div>
  </div>
</body>
</html>
`;