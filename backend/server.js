// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// --------------------------
// 🔥 Middleware
// --------------------------
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// --------------------------
// 🔥 Connect MongoDB
// --------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// --------------------------
// 🔥 API Routes
// --------------------------
app.use("/api/auth", authRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("IntelliLearn Backend Running...");
});

// --------------------------
// 🔥 Start Server
// --------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
