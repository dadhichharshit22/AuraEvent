
export const paymentSuccessTemplate = (
    eventTitle: string,
    amount: number,
    transactionId: string,
    paymentDate: string
  ): string => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Payment Successful</title>
        <style>
          body { 
            font-family: Arial, sans-serif;
            color: #333333;
            line-height: 1.6;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #eaeaea;
            border-radius: 5px;
          }
          .header {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            padding: 20px;
            background-color: #f9f9f9;
          }
          .details {
            background-color: white;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
          }
          .footer {
            text-align: center;
            padding-top: 20px;
            font-size: 12px;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Payment Successful</h1>
          </div>
          <div class="content">
            <p>Thank you for your payment for <strong>${eventTitle}</strong>. Your transaction was successful!</p>
            
            <div class="details">
              <h3>Payment Details:</h3>
              <p><strong>Amount:</strong> ₹${amount.toFixed(2)}</p>
              <p><strong>Transaction ID:</strong> ${transactionId}</p>
              <p><strong>Payment Date:</strong> ${paymentDate}</p>
            </div>
            
            <p>You can access your event details and tickets from your account dashboard.</p>
            <p>We're looking forward to seeing you at the event!</p>
          </div>
          <div class="footer">
            <p>This is an automated email, please do not reply.</p>
            <p>© ${new Date().getFullYear()} Event Management. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  
  export const paymentFailureTemplate = (
    eventTitle: string,
    amount: number,
    errorMessage: string
  ): string => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Payment Failed</title>
        <style>
          body { 
            font-family: Arial, sans-serif;
            color: #333333;
            line-height: 1.6;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #eaeaea;
            border-radius: 5px;
          }
          .header {
            background-color: #f44336;
            color: white;
            padding: 10px 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            padding: 20px;
            background-color: #f9f9f9;
          }
          .details {
            background-color: white;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
          }
          .footer {
            text-align: center;
            padding-top: 20px;
            font-size: 12px;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Payment Failed</h1>
          </div>
          <div class="content">
            <p>We're sorry, but your payment for <strong>${eventTitle}</strong> could not be processed.</p>
            
            <div class="details">
              <h3>Payment Details:</h3>
              <p><strong>Amount:</strong> ₹${amount.toFixed(2)}</p>
              <p><strong>Error Message:</strong> ${errorMessage || 'Unknown error'}</p>
            </div>
            
            <p>Please try again later or use a different payment method. If the problem persists, contact our support team.</p>
          </div>
          <div class="footer">
            <p>This is an automated email, please do not reply.</p>
            <p>© ${new Date().getFullYear()} Event Management. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  