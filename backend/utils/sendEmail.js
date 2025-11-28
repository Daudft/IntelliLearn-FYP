import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,   // Your Gmail
    pass: process.env.EMAIL_PASS,   // App Password
  },
});

/**
 * Send an email
 * @param {string} to - Receiver email
 * @param {string} subject - Email subject
 * @param {string} html - Email HTML content
 */
const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"IntelliLearn" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("📧 Email sent to:", to);
  } catch (error) {
    console.error("❌ Email send error:", error);
  }
};

export default sendEmail;
