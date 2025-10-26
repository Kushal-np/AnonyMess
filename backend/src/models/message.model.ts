import mongoose, { Schema , Document , Model , model } from "mongoose";

export interface IMessage extends Document{
    reciever: mongoose.Types.ObjectId;
    content : string ; 
    createdAt?: Date ; 
}

const messageSchema: Schema<IMessage> = new Schema({
    reciever:{
        type:Schema.Types.ObjectId , ref:"user" , required:true 
    },
    content:{
        type:String , 
        required:true 
    }
},{
    timestamps:true
})

const Message : Model<IMessage> = model("Message" , messageSchema);

export default Message ;