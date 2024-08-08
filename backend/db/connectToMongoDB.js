import mongoose from "mongoose";

const connectToMongoDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected To mongoDB")
    }
    catch(error){
        console.log("Error Connecting to MongoDB", error.message);
    }
}

export default connectToMongoDB;