import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";
import notificationRoutes from "./routes/notification.route";

// Load environment variables FIRST
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ⭐⭐⭐ CRITICAL: CORS MUST BE FIRST MIDDLEWARE ⭐⭐⭐
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200 // For legacy browser support
  })
);

// THEN other middleware
app.use(cookieParser());
app.use(express.json());

// THEN routes
app.use("/auth", authRoutes);
app.use("/message", messageRoutes);
app.use("/notification", notificationRoutes);

// Create HTTP server
const server = http.createServer(app);

// Socket.IO configuration
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"]
  },
});

io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);
  socket.on("join", (userId: string) => socket.join(userId));
  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// ⭐ MUST use server.listen NOT app.listen
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  connectDB();
});