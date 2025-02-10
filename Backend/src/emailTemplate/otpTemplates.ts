export const otpTemplate = (otp: string): string => {
    const expirationTime = new Date(Date.now() + 5 * 60000).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: 'Segoe UI', Arial, sans-serif;
        background-color: #fafbff;
        margin: 0;
        padding: 20px;
      }
      .container {
        background: #ffffff;
        margin: 0 auto;
        padding: 40px;
        max-width: 600px;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
        border: 1px solid #e5e7eb;
      }
      .header {
        text-align: center;
        margin-bottom: 35px;
        position: relative;
      }
      .logo-container {
        background: linear-gradient(135deg, #4f46e5, #6366f1);
        padding: 15px 25px;
        border-radius: 12px;
        display: inline-block;
        margin-bottom: 20px;
      }
      .logo {
        color: white;
        font-size: 22px;
        font-weight: bold;
        letter-spacing: 0.5px;
      }
      .header h1 {
        color: #111827;
        font-size: 26px;
        margin: 20px 0 0;
        font-weight: 600;
      }
      .header-badge {
        background: #eef2ff;
        color: #4f46e5;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 14px;
        display: inline-block;
        margin-top: 12px;
      }
      .content {
        background: #ffffff;
        border-radius: 16px;
        margin: 25px 0;
        text-align: center;
      }
      .greeting {
        color: #4b5563;
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 30px;
        text-align: center;
      }
      .otp-container {
        background: linear-gradient(145deg, #f8faff, #eef2ff);
        border: 2px solid #e0e7ff;
        border-radius: 16px;
        padding: 30px;
        margin: 25px 0;
      }
      .otp-code {
        font-size: 42px;
        letter-spacing: 12px;
        color: #4f46e5;
        font-weight: bold;
        padding: 20px 30px;
        margin: 15px 0;
        display: inline-block;
        border-radius: 12px;
        background: white;
        box-shadow: 0 4px 20px rgba(79, 70, 229, 0.1);
      }
      .timer-container {
        background: #fff;
        padding: 15px 25px;
        border-radius: 12px;
        margin: 20px auto;
        display: inline-block;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      }
      .timer-icon {
        color: #d97706;
        font-size: 18px;
        margin-right: 8px;
      }
      .timer-text {
        color: #d97706;
        font-size: 15px;
        font-weight: 500;
      }
      .security-notice {
        margin: 30px 0;
        padding: 15px 20px;
        background: #fef2f2;
        border-left: 4px solid #ef4444;
        border-radius: 8px;
        color: #b91c1c;
        font-size: 14px;
        text-align: left;
        line-height: 1.5;
      }
      .divider {
        height: 1px;
        background: #e5e7eb;
        margin: 30px 0;
      }
      .footer {
        text-align: center;
        color: #6b7280;
        font-size: 14px;
      }
      .support-badge {
        background: #f3f4f6;
        color: #4b5563;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 13px;
        display: inline-block;
        margin-top: 15px;
      }
      .support-badge a {
        color: #4f46e5;
        text-decoration: none;
        font-weight: 500;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo-container">
          <div class="logo">auraEvent</div>
        </div>
        <h1>Verify Your Account</h1>
        <div class="header-badge">🔐 Security Verification</div>
      </div>
      
      <div class="content">
        <div class="greeting">
          Enter the following verification code to secure your account and access all features.
        </div>
        
        <div class="otp-container">
          <div class="otp-code">${otp}</div>
          
          <div class="timer-container">
            <span class="timer-icon">⏳</span>
            <span class="timer-text">Expires at ${expirationTime} (5 minutes)</span>
          </div>
        </div>
  
        <div class="security-notice">
          <strong>⚠️ Security Alert:</strong><br>
          If you didn't request this verification code, please disregard this email and secure your account immediately.
        </div>
      </div>
  
      <div class="divider"></div>
  
      <div class="footer">
        <p>© ${new Date().getFullYear()} auraEvent. All rights reserved.</p>
        <div class="support-badge">
          Need assistance? Contact <a href="mailto:support@auraevent.com">support@auraevent.com</a>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
  };