import mongoose from "mongoose";

const connectDB = async() : Promise<void> =>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI) ; 
        console.log("Connected to the MONGO DB");
    }
    catch(error){
      console.log(error.message);
    process.exit(1);

    }
}


export default connectDB ; 