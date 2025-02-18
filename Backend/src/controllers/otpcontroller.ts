
  import { Request, Response } from "express";
  import OTP from "../models/OTP";
  import { EmailService } from "../services/emailService";
  import crypto from "crypto";
  
  export class OTPController {
    constructor(private emailService: EmailService) {
    
      this.sendOTP = this.sendOTP.bind(this);
      this.verifyOTP = this.verifyOTP.bind(this);
    }
  
    private generateOTP(): string {
      return crypto.randomInt(100000, 999999).toString();
    }
  
    public sendOTP = async (req: Request, res: Response): Promise<void> => {
      console.log('Received send OTP request:', req.body);
      
      const { email } = req.body;
  
      if (!email) {
        console.log('Email missing in request');
        res.status(400).json({ message: "Email is required" });
        return;
      }
  
      try {
        console.log('Generating OTP for email:', email);
        const otp = this.generateOTP();
        console.log('Generated OTP:', otp);
  

        await OTP.deleteMany({ email });
        console.log('Deleted existing OTPs');
  
    
        const otpDoc = await OTP.create({ email, otp });
        console.log('Created new OTP document:', otpDoc);
  

        await this.emailService.sendOTPEmail(email, otp);
        console.log('Sent OTP email');
  
        res.status(200).json({ message: "OTP sent successfully" });
      } catch (error) {
        console.error('Error in send OTP:', error);
        res.status(500).json({ 
          message: "Error sending OTP",
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    };

  
  public verifyOTP = async (req: Request, res: Response): Promise<void> => {
    const { email, otp } = req.body;
   console.log(req.body);
    try {
      const storedOTP = await OTP.findOne({ email, otp });
      if (!storedOTP) {
        res.status(400).json({ message: "Invalid OTP" });
        return;
      }

      await OTP.deleteMany({ email });
      res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
}
