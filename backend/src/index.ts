import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route"
import messageRoutes from "./routes/message.route"
import notificationRoutes from "./routes/notification.route"
import http from "http";
import {Server} from "socket.io";
const PORT = process.env.PORT! ; 

app.use(cookieParser());
app.use(express.json());

app.use("/auth" , authRoutes)
app.use("/message" , messageRoutes)
app.use("/notification" , notificationRoutes) ; 


const server = http.createServer(app);
export const io = new Server(server, {
  cors: { origin: "http://localhost:5173", credentials: true },
});

io.on("connection", (socket) => {
  socket.on("join", (userId: string) => socket.join(userId));
});

app.listen(PORT ,()=>{
    console.log("Server already running on PORT " , PORT);
    connectDB();
})


