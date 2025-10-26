import {Request , Response} from "express";
import User , {IUser} from "../models/user.model";
import Message , {IMessage} from "../models/message.model";
import Notification , {INotification} from "../models/notification.model";
import { AuthRequest } from "../middlewares/auth";

export const sendMessage = async(req:AuthRequest , res:Response) =>{
    try{
        const {username} = req?.params; 
        const {content}  = req.body;

        const reciever : IUser | null = await User.findOne({username});
        if(!reciever){
            return res.status(404).json({
                error:"User not found"
            })
        }

        const message = await Message.create({reciever : reciever._id , content});
        res.status(200).json(message)
        const notification = await Notification.create({
            user:reciever._id,
            message:"You recieved a new anonymous message!",
        })
    }
    catch(error){
        if(error instanceof Error){
            console.log(error);        
        }
        else{
            console.log(error);
        }
    }
}

export const getMessage = async(req:AuthRequest , res:Response) =>{
    try{
        const user = req.userId ; 
        const message : IMessage[] | null = await Message.find({reciever:user}).sort({createdAt:-1}).limit(5);
        res.status(200).json({
            success:true,
            count:message.length , 
            message
        })
    }
    catch(error){
        if(error instanceof Error){
            console.log(error.message)
        }
        else{
            console.log("Unknown error")
        }
    }
}