// controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

// ----------------------
// 📌 SIGN UP (Send verification email)
// ----------------------
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Already exists?
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already registered" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user (not verified yet)
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
    });

    // Verification link
    const verifyURL = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

    // Send email
    await sendEmail(
      email,
      "Verify Your IntelliLearn Account",
      `
        <h2>Email Verification</h2>
        <p>Click the link below to verify your account:</p>
        <a href="${verifyURL}" target="_blank">Verify Email</a>
      `
    );

    res.json({ message: "Signup successful! Check your email to verify." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------------
// 📌 EMAIL VERIFICATION
// ----------------------
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });
    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.json({ message: "Email verified successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------------
// 📌 SIGN IN
// ----------------------
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid login details" });

    // Check verification
    if (!user.isVerified)
      return res.status(401).json({
        message: "Please verify your email first before logging in",
      });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid login details" });

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------------
// 📌 FORGOT PASSWORD
// ----------------------
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail(
      email,
      "Reset Password",
      `
        <h2>Reset Password Request</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetURL}" target="_blank">Reset Password</a>
      `
    );

    res.json({ message: "Reset link sent to your email" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------------
// 📌 RESET PASSWORD
// ----------------------
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });

    // Update password
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;
    await user.save();

    res.json({ message: "Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
