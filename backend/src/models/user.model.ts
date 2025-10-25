import mongoose , {Document , Schema , Model , model} from "mongoose" ; 

export interface IUser extends Document{
    username:string ;
    createdAt? : Date ; 
}

const userSchema : Schema<IUser> = new Schema(
    {
        username:{
            type:String , 
            required:true , 
            unique:true
        }
    } 
    ,
    {
        timestamps:true
    }
)

const User: Model<IUser> = model<IUser>("User" , userSchema);
export default User