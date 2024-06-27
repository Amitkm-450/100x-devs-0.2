import express from "express";

const app = express();

app.use(express.json());

const otpStore: Record<string, string> = {};

app.post('/generate-otp', (req, res) => {
    const email = req.body.email;
    if(!email) {
        return res.status(400).json({message: "Email required"});
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

    res.status(200).json({ message: "OTP generated and logged" });
})

app.post('/reset-password', (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "Email, OTP, and new password are required" });
    }
    if (otpStore[email] === otp) {
      console.log(`Password for ${email} has been reset to: ${newPassword}`);
      delete otpStore[email]; // Clear the OTP after use
      res.status(200).json({ message: "Password has been reset successfully" });
    } else {
      res.status(401).json({ message: "Invalid OTP" });
    }
});

app.listen(3000);