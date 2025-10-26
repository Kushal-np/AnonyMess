import express ,  {Response} from "express";
import { AuthRequest } from "../middlewares/auth";
import Notification , {INotification} from "../models/notification.model";

export const getNotification = async(req: AuthRequest , res:Response): Promise<void> => {
    const notification : INotification | null = await Notification.find({user:req.userId}).sort({createdAt:-1})
    res.json(notification);
}

export const markAsRead = async(req : AuthRequest , res:Response):Promise<void> =>{

    try{

        const userId = req.userId ; 
        if(!userId){
            res.status(401).json({
                success:false , 
                error:"Unathourized"
            })
            return ; 
            
        }
        
        const result = await Notification.updateMany(
            {user:userId , read:false } , 
            {$set:{read:true} }
        )
        
        
        res.json({success:true });
    }
    catch(error){
        if(error instanceof Error){
            console.log(error.message);
        }
        else{
            console.log("Unknown Error");
        }
    }
}



