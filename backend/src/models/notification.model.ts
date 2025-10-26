import mongoose , {Schema, Document , Model , model} from "mongoose" ; 

export interface INotification extends Document{
    user:mongoose.Types.ObjectId ; 
    message:string ; 
    read: boolean ;
    createdAt? : Date ; 
}

const notificationSchema : Schema<INotification> =  new Schema({
    user:{
        type:Schema.Types.ObjectId , 
        ref:"User" , 
        required:true 
    },
    message:{
        type:String , 
        required:true , 
    } , 
    read: {
      type: Boolean,
      default: false, 

    },
    
},{
    timestamps:true 
})


const Notification : Model<INotification> = model<INotification>("Notification" , notificationSchema)
export default Notification ; 