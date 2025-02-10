export const registrationEmailTemplate = (eventTitle: string, eventDate: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AuraEvent Registration Confirmation</title>
  <style>
    /* Reset styles */
    body, p, h1, h2, h3, h4, h5, h6 {
      margin: 0;
      padding: 0;
      font-family: 'Helvetica Neue', Arial, sans-serif;
    }
    
    /* Base styles */
    body {
      background-color: #f8f9fa;
      color: #2d3748;
      line-height: 1.6;
      padding: 20px;
    }
    
    /* Container */
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(138, 99, 255, 0.1);
    }
    
    /* Header */
    .header {
      background: linear-gradient(135deg, #8A63FF 0%, #6B42FF 100%);
      color: #ffffff;
      padding: 40px 20px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 50%);
    }
    
    .logo {
      font-size: 32px;
      font-weight: 800;
      margin-bottom: 10px;
      letter-spacing: -0.5px;
    }

    .logo span {
      color: #FFD700;
    }

    /* Status Badge */
    .status-badge {
      display: inline-block;
      padding: 8px 16px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
      margin-top: 10px;
    }
    
    /* Content */
    .content {
      padding: 40px 30px;
    }

    /* Event Card */
    .event-card {
      background: rgba(138, 99, 255, 0.03);
      border: 1px solid rgba(138, 99, 255, 0.1);
      border-radius: 12px;
      padding: 25px;
      margin: 25px 0;
    }

    .event-card h2 {
      color: #8A63FF;
      font-size: 24px;
      margin-bottom: 20px;
      font-weight: 600;
    }

    .event-detail {
      display: flex;
      align-items: flex-start;
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid rgba(138, 99, 255, 0.1);
    }

    .event-detail:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .detail-label {
      font-weight: 600;
      color: #6B42FF;
      width: 100px;
      flex-shrink: 0;
    }

    /* Message Box */
    .message-box {
      background: rgba(138, 99, 255, 0.05);
      border-left: 4px solid #8A63FF;
      padding: 20px;
      margin: 25px 0;
      border-radius: 6px;
    }

    .message-box p {
      color: #4b5563;
    }

    /* Action Button */
    .action-button {
      display: inline-block;
      background: linear-gradient(135deg, #8A63FF 0%, #6B42FF 100%);
      color: #ffffff;
      padding: 14px 28px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      margin: 20px 0;
      text-align: center;
    }
    
    /* Footer */
    .footer {
      background: rgba(138, 99, 255, 0.02);
      padding: 30px 20px;
      text-align: center;
      font-size: 14px;
      color: #6B42FF;
      border-top: 1px solid rgba(138, 99, 255, 0.1);
    }

    .social-links {
      margin: 20px 0;
    }

    .social-link {
      display: inline-block;
      margin: 0 10px;
      color: #8A63FF;
      text-decoration: none;
      font-weight: 500;
    }

    .copyright {
      color: #6d7280;
      margin-top: 15px;
    }

    /* Responsive Design */
    @media only screen and (max-width: 600px) {
      body {
        padding: 10px;
      }
      
      .container {
        border-radius: 8px;
      }
      
      .header {
        padding: 30px 15px;
      }
      
      .content {
        padding: 30px 20px;
      }
      
      .event-card {
        padding: 20px;
      }
      
      .event-detail {
        flex-direction: column;
      }
      
      .detail-label {
        width: 100%;
        margin-bottom: 5px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Aura<span>Event</span></div>
      <div class="status-badge">Registration Confirmed ✨</div>
    </div>
    
    <div class="content">
      <div class="event-card">
        <h2>${eventTitle}</h2>
        <div class="event-detail">
          <span class="detail-label">Date</span>
          <span class="detail-value">${new Date(eventDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          })}</span>
        </div>
      </div>

      <div class="message-box">
        <p>🎉 <strong>Congratulations!</strong> Your spot has been secured for this amazing event. We can't wait to see you there!</p>
      </div>

      <a href="#" class="action-button">View Event Details ✨</a>

      <p style="margin-top: 30px;">Need to add this event to your calendar? Click one of the options below:</p>
      <div style="margin: 20px 0;">
        <a href="#" style="color: #6B42FF; margin-right: 20px;">Google Calendar</a>
        <a href="#" style="color: #6B42FF; margin-right: 20px;">Apple Calendar</a>
        <a href="#" style="color: #6B42FF;">Outlook</a>
      </div>
    </div>
    
    <div class="footer">
      <div class="social-links">
        <a href="#" class="social-link">Twitter</a>
        <a href="#" class="social-link">Facebook</a>
        <a href="#" class="social-link">Instagram</a>
      </div>
      <div class="copyright">
        <p>&copy; ${new Date().getFullYear()} AuraEvent. All rights reserved.</p>
        <p>Creating Extraordinary Events Together</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

export const unregistrationEmailTemplate = (eventTitle: string, eventDate: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AuraEvent Unregistration Confirmation</title>
  <style>
    /* Same styles as registration template */
    /* ... [Previous styles remain the same] ... */
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Aura<span>Event</span></div>
      <div class="status-badge">Unregistration Confirmed</div>
    </div>
    
    <div class="content">
      <div class="event-card">
        <h2>${eventTitle}</h2>
        <div class="event-detail">
          <span class="detail-label">Date</span>
          <span class="detail-value">${new Date(eventDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          })}</span>
        </div>
      </div>

      <div class="message-box">
        <p>We're sorry to see you go! Thank you for letting us know you won't be able to attend. We hope to see you at future events! 💫</p>
      </div>

      <div style="margin-top: 30px;">
        <h3 style="color: #6B42FF; margin-bottom: 15px;">Upcoming Events You Might Like</h3>
        <p>Explore our other exciting events and find your next experience:</p>
        <a href="#" class="action-button">Browse Events ✨</a>
      </div>
    </div>
    
    <div class="footer">
      <div class="social-links">
        <a href="#" class="social-link">Twitter</a>
        <a href="#" class="social-link">Facebook</a>
        <a href="#" class="social-link">Instagram</a>
      </div>
      <div class="copyright">
        <p>&copy; ${new Date().getFullYear()} AuraEvent. All rights reserved.</p>
        <p>Creating Extraordinary Events Together</p>
      </div>
    </div>
  </div>
</body>
</html>
`;