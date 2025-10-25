import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
const PORT = process.env.PORT ; 

app.get("/" , (req , res)=>{
    res.send("Hello world")
})

app.listen(PORT ,()=>{
    console.log("Server already running on PORT " , PORT);
    connectDB();
})


