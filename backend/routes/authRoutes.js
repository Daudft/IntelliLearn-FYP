import express from "express";
import {
  signup,
  signin,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

// Signup
router.post("/signup", signup);

// Email verification (frontend uses GET + token in URL)
router.get("/verify-email/:token", verifyEmail);

// Signin (frontend calls /login)
router.post("/login", signin);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password (frontend sends token param)
router.post("/reset-password/:token", resetPassword);

export default router;
