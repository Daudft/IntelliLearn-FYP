import express from "express";
import {
  signup,
  signin,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

// SIGNUP
router.post("/signup", signup);

// LOGIN (frontend calls /login)
router.post("/login", signin);

// VERIFY EMAIL (token from URL)
router.get("/verify-email/:token", verifyEmail);

// FORGOT PASSWORD
router.post("/forgot-password", forgotPassword);

// RESET PASSWORD WITH TOKEN
router.post("/reset-password/:token", resetPassword);

export default router;
