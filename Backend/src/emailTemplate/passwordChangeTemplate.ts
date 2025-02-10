export const passwordChangeTemplate = (username: string) => {
    const currentTime = new Date().toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZoneName: 'short'
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
      .success-badge {
        background: #ecfdf5;
        color: #059669;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 14px;
        display: inline-block;
        margin-top: 15px;
      }
      .content {
        background: #ffffff;
        border-radius: 16px;
        margin: 25px 0;
        text-align: left;
      }
      .alert-box {
        background: linear-gradient(145deg, #f8faff, #eef2ff);
        border: 2px solid #e0e7ff;
        border-radius: 16px;
        padding: 25px;
        margin: 25px 0;
      }
      .time-badge {
        background: #f3f4f6;
        color: #4b5563;
        padding: 6px 12px;
        border-radius: 15px;
        font-size: 13px;
        display: inline-block;
        margin-bottom: 15px;
      }
      .security-tips {
        background: #fff7ed;
        border-left: 4px solid #f97316;
        border-radius: 8px;
        padding: 20px;
        margin: 25px 0;
      }
      .security-tips h3 {
        color: #c2410c;
        margin: 0 0 10px 0;
        font-size: 16px;
      }
      .security-tips ul {
        margin: 0;
        padding-left: 20px;
        color: #9a3412;
      }
      .security-tips li {
        margin: 8px 0;
        font-size: 14px;
      }
      .action-required {
        background: #fef2f2;
        border-radius: 8px;
        padding: 15px 20px;
        margin: 25px 0;
        color: #b91c1c;
        font-size: 14px;
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
        <div class="success-badge">✓ Password Changed Successfully</div>
      </div>
      
      <div class="content">
        <div class="alert-box">
          <div class="time-badge">🕒 ${currentTime}</div>
          <p style="margin: 0; color: #1f2937; font-size: 16px;">
            Hi ${username},<br><br>
            Your password has been successfully changed. This change was made from your account settings.
          </p>
        </div>
  
        <div class="action-required">
          <strong>⚠️ Action Required:</strong><br>
          If you didn't make this change, please contact our support team immediately and secure your account.
        </div>
  
        <div class="security-tips">
          <h3>🔒 Security Tips</h3>
          <ul>
            <li>Never share your password with anyone</li>
            <li>Use a unique password for each account</li>
            <li>Enable two-factor authentication for extra security</li>
            <li>Regularly check your account for suspicious activity</li>
          </ul>
        </div>
      </div>
  
      <div class="divider"></div>
  
      <div class="footer">
        <p>© ${new Date().getFullYear()} auraEvent. All rights reserved.</p>
        <div class="support-badge">
          Questions? Contact <a href="mailto:support@auraevent.com">support@auraevent.com</a>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
  };