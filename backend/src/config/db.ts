import mongoose from "mongoose";

const connectDB = async() : Promise<void> =>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI!) ; 
        console.log("Connected to the MONGO DB");
    }
    catch(error){
      if(error instanceof Error){
        console.log(error.message);
      }
      else{
        console.log("Unknown error" , error)
      }

    }
}


export default connectDB ; 