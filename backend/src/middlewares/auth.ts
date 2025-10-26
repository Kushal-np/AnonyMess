import {Request , Response , NextFunction} from "express";
import jwt from "jsonwebtoken";
import User , {IUser} from "../models/user.model";

export interface AuthRequest extends Request{
    userId? : string ; 
}


interface JwtPayload {
    id:string ; 

}


export const protect = async (req: AuthRequest , res:Response , next:NextFunction) =>{
    try{
        const token = req.cookies.token ; 
        if(!token){
            return res.status(401).json({
                error:"Not authorized"
            })
        }
        const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY! ) as JwtPayload;
        console.log(decoded)
        req.userId = decoded.id ; 
        const user : IUser | null = await User.findById(req.userId);
        if(!user){
            return res.status(401).json({
                error:"User not found"
            })
        }
        next();
    }
    catch(error){
        if( error instanceof Error){
            console.log(error);
        }
        else{
            console.log("Unknown error message")
        }
    }
}